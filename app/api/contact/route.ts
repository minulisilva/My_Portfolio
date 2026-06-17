import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/* ─── Contact Form API Route ────────────────────────────────────────────────
   Sends form submissions to your email using Resend.

   SETUP:
   1. npm install resend
   2. Sign up at https://resend.com (free tier: 100 emails/day, 3000/month)
   3. Get your API key from https://resend.com/api-keys
   4. Add to .env.local:
        RESEND_API_KEY=re_xxxxxxxxxxxx
   5. Verify a domain in Resend (or use their test domain "onboarding@resend.dev"
      for development — works without domain verification)

      re_FSwDUZZh_KoTZMad3Lf1UGioFokSgt17T
──────────────────────────────────────────────────────────────────────────── */

const resend = new Resend(process.env.RESEND_API_KEY);

/* TODO: change this to your own email address */
const TO_EMAIL = "minulidesilva2003@gmail.com";

/* TODO: once you verify your own domain in Resend, change this to
   something like "Portfolio <contact@yourdomain.com>".
   Until then, Resend's test sender works for development. */
const FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    // ── Basic validation ──
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── Send email via Resend ──
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email, // lets you hit "Reply" and respond directly to the sender
      subject: `New portfolio message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #111;">New Contact Form Submission</h2>
          <p style="color: #555; font-size: 14px;">You received a new message from your portfolio website.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 12px 16px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #999; font-size: 12px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Thanks for reaching out! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}