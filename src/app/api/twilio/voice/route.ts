import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// This webhook fires the moment someone calls the Twilio number.
// We return TwiML instructions telling Twilio to forward the call
// to the business's real phone number.
// The `action` URL is called when the dial attempt finishes (answered or not).

export async function POST(req: Request) {
  const formData = await req.formData();
  const toNumber = formData.get("To") as string; // The Twilio number that was called

  // Find which business owns this Twilio number
  const business = await db.business.findFirst({
    where: { twilioNumber: toNumber },
  });

  // If no business found, just hang up cleanly
  if (!business) {
    console.log(`[Twilio Voice] No business found for number: ${toNumber}`);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Hangup/></Response>`,
      { headers: { "Content-Type": "text/xml" } }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://service-plus-five.vercel.app";
  const statusCallbackUrl = `${baseUrl}/api/webhooks/twilio`;

  // TwiML: Forward the call to the business's real phone
  // - timeout="25" → if no answer in 25 seconds, treat as missed
  // - action → URL Twilio calls when this Dial attempt ends (with DialCallStatus)
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial
    callerId="${toNumber}"
    timeout="25"
    action="${statusCallbackUrl}"
    method="POST"
  >${business.phone}</Dial>
</Response>`;

  return new NextResponse(twiml, {
    headers: { "Content-Type": "text/xml" },
  });
}
