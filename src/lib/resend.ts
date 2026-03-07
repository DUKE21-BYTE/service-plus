import "server-only";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Send a missed call text-back notification email
export async function sendMissedCallAlert({
  to,
  businessName,
  callerPhone,
}: {
  to: string;
  businessName: string;
  callerPhone: string;
}) {
  return resend.emails.send({
    from: "ServicePulse <notifications@servicepulse.io>",
    to,
    subject: `Missed call from ${callerPhone} — text-back sent`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">📞 Missed Call Alert</h2>
        <p><strong>${businessName}</strong> missed a call from <strong>${callerPhone}</strong>.</p>
        <p>An automatic text-back was sent within 60 seconds.</p>
        <hr style="border: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 14px;">ServicePulse — Automation for Home Services</p>
      </div>
    `,
  });
}

// Send a review request notification
export async function sendReviewRequestConfirmation({
  to,
  customerName,
}: {
  to: string;
  customerName: string;
}) {
  return resend.emails.send({
    from: "ServicePulse <notifications@servicepulse.io>",
    to,
    subject: `Review request sent to ${customerName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">⭐ Review Request Sent</h2>
        <p>A Google review request was automatically sent to <strong>${customerName}</strong>.</p>
        <p>You'll be notified when they leave a review.</p>
        <hr style="border: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 14px;">ServicePulse — Automation for Home Services</p>
      </div>
    `,
  });
}
