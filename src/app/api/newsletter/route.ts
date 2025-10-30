import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const adminEmail = "endysworld@yahoo.com";

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color:#111827;">New Newsletter Subscription</h2>
          <p>A user has subscribed to the newsletter.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p style="color:#6b7280; font-size:12px;">${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}</p>
        </div>
      `,
    };

    const subscriberMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for subscribing to Endella Luxury",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2 style="color:#111827;">Welcome to Endella Luxury ✨</h2>
          <p>Thanks for subscribing to our newsletter. You\'ll be the first to know about new arrivals, exclusive deals, and style tips.</p>
          <p style="margin-top:24px; color:#6b7280; font-size:12px;">If you didn\'t subscribe, you can ignore this email.</p>
          <p style="color:#9ca3af; font-size:12px; margin-top:8px;">© ${new Date().getFullYear()} Endella Luxury. All rights reserved.</p>
        </div>
      `,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(subscriberMailOptions);
    }

    return NextResponse.json({ success: true, message: "Subscribed" });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}


