import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // Verify the webhook payload
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch {
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  // Handle the event
  const { type: eventType, data } = evt;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = data;
    const primaryEmail = email_addresses?.[0]?.email_address;

    if (!primaryEmail) {
      return new NextResponse("No email found", { status: 400 });
    }

    const fullName = [first_name, last_name].filter(Boolean).join(" ") || null;

    await db.user.create({
      data: {
        id, // Clerk user ID as our primary key
        email: primaryEmail,
        name: fullName,
      },
    });

    console.log(`[Clerk Webhook] Created user: ${id} (${primaryEmail})`);
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = data;
    const primaryEmail = email_addresses?.[0]?.email_address;
    const fullName = [first_name, last_name].filter(Boolean).join(" ") || null;

    await db.user.update({
      where: { id },
      data: {
        ...(primaryEmail && { email: primaryEmail }),
        ...(fullName !== undefined && { name: fullName }),
      },
    });

    console.log(`[Clerk Webhook] Updated user: ${id}`);
  }

  if (eventType === "user.deleted") {
    const { id } = data;
    if (id) {
      // Cascade delete via Prisma schema handles related business/automations etc.
      await db.user.delete({ where: { id } });
      console.log(`[Clerk Webhook] Deleted user: ${id}`);
    }
  }

  return new NextResponse("OK", { status: 200 });
}
