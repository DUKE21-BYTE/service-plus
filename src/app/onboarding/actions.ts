"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const onboardingSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  phone: z.string().min(7, "Enter a valid phone number"),
  industry: z.enum(["HVAC", "PLUMBING", "ROOFING", "ELECTRICAL", "LANDSCAPING", "OTHER"]),
  website: z.string().url("Enter a valid URL (include https://)").optional().or(z.literal("")),
});

export async function completeOnboarding(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const raw = {
    businessName: formData.get("businessName") as string,
    phone: formData.get("phone") as string,
    industry: formData.get("industry") as string,
    website: (formData.get("website") as string) || "",
  };

  const parsed = onboardingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { businessName, phone, industry, website } = parsed.data;

  // Ensure user exists in DB (in case webhook is delayed)
  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email: "" }, // email will be filled by webhook
  });

  // Create business and seed default automations
  await db.business.create({
    data: {
      userId,
      name: businessName,
      phone,
      industry: industry as any,
      website: website || null,
      automations: {
        create: [
          {
            type: "MISSED_CALL_TEXTBACK",
            enabled: true,
            config: {
              message: `Hi! You recently called ${businessName}. We couldn't get to the phone — how can we help you today?`,
            },
          },
          {
            type: "REVIEW_REQUEST",
            enabled: true,
            config: {
              message: `Hi! Thanks for choosing ${businessName}. We'd love your feedback — could you leave us a quick Google review?`,
              delayHours: 2,
            },
          },
        ],
      },
    },
  });

  redirect("/dashboard");
}
