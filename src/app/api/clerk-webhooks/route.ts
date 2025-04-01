import { db } from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // Verify the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    // Verify the payload with the headers
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // Get the user's email
    const primaryEmail = email_addresses?.[0]?.email_address || "";

    try {
      // Create or update user in your database
      await db.user.upsert({
        where: { clerkUserID: id },
        update: {
          email: primaryEmail,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
        },
        create: {
          clerkUserID: id,
          email: primaryEmail,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
          // Add any other required fields for your User model
        },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error syncing user:", error);
      return NextResponse.json(
        { error: "Error syncing user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
