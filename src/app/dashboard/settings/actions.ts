"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const settingsSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  phone: z.string().min(7, "Enter a valid phone number"),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export async function saveBusinessSettings(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const raw = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    website: (formData.get("website") as string) || "",
  };

  const parsed = settingsSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await db.business.updateMany({
    where: { userId },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      website: parsed.data.website || null,
    },
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  return { success: true };
}
