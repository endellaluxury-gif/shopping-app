import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    console.log("Contact form submission received");

    const body = await request.json();
    const { first_name, last_name, email, phone, subject, message } = body;

    // Validate required fields
    if (!first_name || !last_name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const customerName = `${first_name} ${last_name}`;
    const adminEmail = "endysworld@yahoo.com";

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0E7346; border-bottom: 2px solid #0E7346; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0E7346; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #0E7346; font-weight: bold;">
              📧 Please respond to this customer at: ${email}
            </p>
          </div>
        </div>
      `,
    };

    // Auto-response email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Endella Luxury",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0E7346; margin: 0;">Endella Luxury</h1>
            <p style="color: #666; margin: 5px 0;">Nigeria's Premier Fashion & Beauty Destination</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0E7346; margin-top: 0;">Thank You for Your Message!</h2>
            <p>Dear ${customerName},</p>
            <p>We have received your message and truly appreciate you reaching out to us. Our team is committed to providing you with the best possible service.</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0E7346; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
            <ul style="line-height: 1.8;">
              <li>Our customer experience team will review your message</li>
              <li>We'll respond within 24 hours during business days</li>
              <li>If urgent, please call us at +234 706 595 2662</li>
            </ul>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #0E7346; margin-top: 0;">Your Message Details</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString(
              "en-NG",
              {
                timeZone: "Africa/Lagos",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Need immediate assistance?<br>
              📞 Call us: +234 706 595 2662<br>
              📧 Email: endysworld@yahoo.com
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
              © ${new Date().getFullYear()} Endella Luxury. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    console.log("Sending emails...");

    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      // Send email to admin
      await transporter.sendMail(adminMailOptions);
      console.log("Admin email sent successfully");

      // Send auto-response to customer
      await transporter.sendMail(customerMailOptions);
      console.log("Customer auto-response sent successfully");
    } else {
      console.log("Email credentials not configured, skipping email sending");
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
