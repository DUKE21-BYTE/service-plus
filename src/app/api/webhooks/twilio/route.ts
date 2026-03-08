import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/twilio";
import { sendMissedCallAlert } from "@/lib/resend";
import { CallStatus } from "@prisma/client";

// Statuses that mean the business didn't pick up
const MISSED_STATUSES = ["busy", "no-answer", "canceled", "failed"];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Twilio sends DialCallStatus when triggered via <Dial action="">
    // It sends CallStatus when triggered via the number's status callback
    // We handle both so the code works regardless of how Twilio is configured.
    const dialStatus = formData.get("DialCallStatus") as string | null;
    const callStatus = formData.get("CallStatus") as string | null;
    const status = dialStatus || callStatus || "";

    const toNumber = formData.get("To") as string;     // Twilio number (business)
    const fromNumber = formData.get("From") as string; // Caller's number

    console.log(`[Twilio Webhook] Status: ${status} | To: ${toNumber} | From: ${fromNumber}`);

    // Not a missed call — do nothing
    if (!MISSED_STATUSES.includes(status)) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Find the business that owns this Twilio number
    const business = await db.business.findFirst({
      where: { twilioNumber: toNumber },
      include: {
        user: true,
        automations: {
          where: { type: "MISSED_CALL_TEXTBACK", enabled: true },
        },
      },
    });

    if (!business) {
      console.log(`[Twilio Webhook] No business found for: ${toNumber}`);
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Anti-spam: Skip if we already texted this number in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const alreadyTexted = await db.callEvent.findFirst({
      where: {
        businessId: business.id,
        callerPhone: fromNumber,
        textSent: true,
        occurredAt: { gte: oneHourAgo },
      },
    });

    // Log the call first
    const callEvent = await db.callEvent.create({
      data: {
        businessId: business.id,
        callerPhone: fromNumber,
        callStatus: CallStatus.MISSED,
        textSent: false,
      },
    });

    if (alreadyTexted) {
      console.log(`[Twilio Webhook] Anti-spam: already texted ${fromNumber} recently.`);
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Check if automation is enabled
    const automation = business.automations[0];
    if (!automation) {
      console.log(`[Twilio Webhook] Text-back disabled for business: ${business.id}`);
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Build the SMS message from automation config
    const config = automation.config as { message?: string };
    const message =
      config?.message ||
      `Hi! You recently called ${business.name}. We missed you — how can we help? Reply here or call us back at ${business.phone}.`;

    // Send the SMS
    const smsSent = await sendSMS({
      to: fromNumber,
      from: toNumber,
      body: message,
    });

    // Update the call log with text status
    await db.callEvent.update({
      where: { id: callEvent.id },
      data: {
        textSent: smsSent,
        textSentAt: smsSent ? new Date() : null,
      },
    });

    // Email alert to business owner
    if (smsSent && business.user?.email) {
      await sendMissedCallAlert({
        to: business.user.email,
        businessName: business.name,
        callerPhone: fromNumber,
      }).catch((err) =>
        console.error("[Twilio Webhook] Resend email failed:", err)
      );
    }

    console.log(`[Twilio Webhook] ✅ Missed call handled. SMS ${smsSent ? "sent" : "failed"}.`);

    // Return empty TwiML — Twilio expects an XML response
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      { headers: { "Content-Type": "text/xml" } }
    );
  } catch (err) {
    console.error("[Twilio Webhook] Unhandled error:", err);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      { headers: { "Content-Type": "text/xml" } }
    );
  }
}
