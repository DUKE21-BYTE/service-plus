import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Initialize Twilio client.
// This allows us to interact with the Twilio API to send SMS.
export const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function sendSMS({
  to,
  from,
  body,
}: {
  to: string;
  from: string;
  body: string;
}) {
  if (!twilioClient) {
    console.error("Twilio client is not initialized. Missing environment variables.");
    return false;
  }

  try {
    const message = await twilioClient.messages.create({
      body,
      from,
      to,
    });
    console.log(`Twilio SMS sent successfully. Message SID: ${message.sid}`);
    return true;
  } catch (error) {
    console.error("Failed to send SMS via Twilio:", error);
    return false;
  }
}
