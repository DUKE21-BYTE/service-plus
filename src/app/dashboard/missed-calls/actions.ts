"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveTwilioSettings(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const twilioNumber = (formData.get("twilioNumber") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();
  const enabled = formData.get("enabled") === "on";

  if (!twilioNumber) return { error: "Twilio phone number is required" };

  // Update the Twilio number on the business
  const business = await db.business.findFirst({ where: { userId } });
  if (!business) redirect("/onboarding");

  await db.business.update({
    where: { id: business.id },
    data: { twilioNumber },
  });

  // Update the automation config
  await db.automation.upsert({
    where: {
      businessId_type: {
        businessId: business.id,
        type: "MISSED_CALL_TEXTBACK",
      },
    },
    update: {
      enabled,
      config: {
        message: message || `Hi! You called ${business.name} and we missed you. How can we help?`,
      },
    },
    create: {
      businessId: business.id,
      type: "MISSED_CALL_TEXTBACK",
      enabled,
      config: {
        message: message || `Hi! You called ${business.name} and we missed you. How can we help?`,
      },
    },
  });

  revalidatePath("/dashboard/missed-calls");
  return { success: true };
}
