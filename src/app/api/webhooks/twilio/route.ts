import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/twilio";
import { sendMissedCallAlert } from "@/lib/resend";
import { CallStatus } from "@prisma/client";

// Which Twilio statuses count as a "missed" call?
const MISSED_CALL_STATUSES = ["busy", "no-answer", "canceled", "failed"];

export async function POST(req: Request) {
  try {
    // Twilio sends data as URL-encoded form data
    const formData = await req.formData();
    const callStatus = formData.get("CallStatus") as string;
    const toNumber = formData.get("To") as string;
    const fromNumber = formData.get("From") as string;

    // Formatting: twilio numbers often have the + country code (e.g. +1234567890)
    // Ensure we handle them cleanly if needed, though exact string match usually works.
    
    // 1. Is it a missed call? If not, just return 200 OK to Twilio.
    if (!MISSED_CALL_STATUSES.includes(callStatus)) {
      return new NextResponse("Not a missed call, ignoring.", { status: 200 });
    }

    // 2. Find the business this Twilio number belongs to
    const business = await db.business.findFirst({
      where: { twilioNumber: toNumber },
      include: {
        user: true, // Need the user to get their email address
        automations: {
          where: { type: "MISSED_CALL_TEXTBACK", enabled: true },
        },
      },
    });

    if (!business) {
      console.log(`[Twilio Webhook] No business found for number: ${toNumber}`);
      return new NextResponse("Business not found", { status: 200 });
    }

    // 3. Check if the Missed Call text-back automation is enabled
    const textbackAutomation = business.automations[0];
    if (!textbackAutomation) {
      console.log(`[Twilio Webhook] Business ${business.id} has Missed Call Text-back disabled.`);
      
      // Still log the call event, but don't text back
      await db.callEvent.create({
        data: {
          businessId: business.id,
          callerPhone: fromNumber,
          callStatus: CallStatus.MISSED,
          textSent: false,
        },
      });

      return new NextResponse("Automation disabled", { status: 200 });
    }

    // 4. Anti-spam check: Did we already text this number recently? (e.g., within the last 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentEvent = await db.callEvent.findFirst({
      where: {
        businessId: business.id,
        callerPhone: fromNumber,
        textSent: true,
        occurredAt: { gte: oneHourAgo },
      },
    });

    if (recentEvent) {
      console.log(`[Twilio Webhook] Already texted ${fromNumber} recently. Skipping to avoid spam.`);
      return new NextResponse("Anti-spam: already texted recently", { status: 200 });
    }

    // 5. Send the SMS via Twilio using the configured message
    // Parse the config JSON. Safely fallback if missing.
    const config = textbackAutomation.config as { message?: string };
    const textMessage = config?.message || `Hi! You recently called ${business.name}. We couldn't get to the phone. How can we help you today?`;

    const smsSent = await sendSMS({
      to: fromNumber,
      from: toNumber,
      body: textMessage,
    });

    // 6. Log the event in the database
    await db.callEvent.create({
      data: {
        businessId: business.id,
        callerPhone: fromNumber,
        callStatus: CallStatus.MISSED,
        textSent: smsSent,
        textSentAt: smsSent ? new Date() : null,
      },
    });

    // 7. Send an email alert to the business owner via Resend
    if (smsSent && business.user?.email) {
      await sendMissedCallAlert({
        to: business.user.email,
        businessName: business.name,
        callerPhone: fromNumber,
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("[Twilio Webhook] Error processing webhook:", error);
    // Returning 200 so Twilio doesn't infinitely retry broken logic
    return new NextResponse("Internal Server Error", { status: 200 });
  }
}
