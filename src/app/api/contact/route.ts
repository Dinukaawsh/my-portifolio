import { NextResponse } from "next/server";
import { sendDiscordNotification } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, body: messageBody } = body;

    // Validate required fields
    if (!name || !email || !subject || !messageBody) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable or use default
    const recipientEmail =
      process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "dinukaaw.sh@gmail.com";

    // Send email using a service (you can use Resend, SendGrid, Nodemailer, etc.)
    // For now, we'll use a simple approach with a service like Resend
    // You'll need to install: npm install resend
    // Or use any other email service

    // Example with Resend (uncomment and configure if using Resend):
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Portfolio Contact <contact@yourdomain.com>',
      to: recipientEmail,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${messageBody.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // For now, we'll log the email (you should implement actual email sending)
    console.log("Contact form submission:", {
      to: recipientEmail,
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      name,
      message: messageBody,
    });

    // Send Discord notification
    await sendDiscordNotification({
      type: "contact",
      data: {
        contact: {
          name,
          email,
          subject,
          message: messageBody,
          timestamp: new Date().toLocaleString(),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        error: "Failed to process contact form",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


