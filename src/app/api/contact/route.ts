import { NextResponse } from "next/server";
import { sendDiscordNotification } from "@/lib/discord";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, subject, body: messageBody } = body;
    let { email } = body;

    // Validate required fields
    if (!name || !email || !subject || !messageBody) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format with comprehensive checks
    const validateEmail = (email: string): { valid: boolean; error?: string } => {
      // Trim whitespace
      const trimmedEmail = email.trim();

      // Check if empty
      if (!trimmedEmail) {
        return { valid: false, error: "Email is required" };
      }

      // Check length (RFC 5321: local part max 64 chars, domain max 255 chars, total max 254)
      if (trimmedEmail.length > 254) {
        return { valid: false, error: "Email address is too long (maximum 254 characters)" };
      }

      // More comprehensive email regex
      // Allows: letters, numbers, dots, hyphens, underscores, plus signs
      // Domain must have at least one dot and valid TLD
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!emailRegex.test(trimmedEmail)) {
        return { valid: false, error: "Invalid email format. Please enter a valid email address" };
      }

      // Check for common typos and invalid patterns
      if (trimmedEmail.includes("..")) {
        return { valid: false, error: "Email cannot contain consecutive dots" };
      }

      if (trimmedEmail.startsWith(".") || trimmedEmail.startsWith("@")) {
        return { valid: false, error: "Email cannot start with a dot or @ symbol" };
      }

      if (trimmedEmail.endsWith(".") || trimmedEmail.endsWith("@")) {
        return { valid: false, error: "Email cannot end with a dot or @ symbol" };
      }

      // Split email to check parts
      const parts = trimmedEmail.split("@");
      if (parts.length !== 2) {
        return { valid: false, error: "Email must contain exactly one @ symbol" };
      }

      const [localPart, domain] = parts;

      // Validate local part (before @)
      if (localPart.length === 0 || localPart.length > 64) {
        return { valid: false, error: "Email local part (before @) must be between 1 and 64 characters" };
      }

      // Validate domain (after @)
      if (domain.length === 0 || domain.length > 255) {
        return { valid: false, error: "Email domain (after @) must be between 1 and 255 characters" };
      }

      // Check domain has at least one dot (has TLD)
      if (!domain.includes(".")) {
        return { valid: false, error: "Email domain must include a top-level domain (e.g., .com, .org)" };
      }

      // Check TLD is at least 2 characters
      const domainParts = domain.split(".");
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2) {
        return { valid: false, error: "Email must have a valid top-level domain (e.g., .com, .org)" };
      }

      // Check for valid TLD characters (letters only)
      if (!/^[a-zA-Z]+$/.test(tld)) {
        return { valid: false, error: "Top-level domain must contain only letters" };
      }

      return { valid: true };
    };

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error || "Invalid email format" },
        { status: 400 }
      );
    }

    // Use trimmed email for processing
    email = email.trim();

    // Get recipient email from environment variable or use default
    const recipientEmail =
      process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "dinukaaw.sh@gmail.com";

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;
    let emailError: string | null = null;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Get sender email from environment or use a default
        const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const customDomainEmail = process.env.RESEND_FROM_EMAIL;

        const result = await resend.emails.send({
          from: senderEmail,
          to: recipientEmail,
          replyTo: email, // Allow replying directly to the sender
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Email:</strong> <a href="mailto:${email}" style="color: #4F46E5;">${email}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Subject:</strong> ${subject}</p>
                <div style="margin-top: 20px;">
                  <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Message:</strong></p>
                  <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4F46E5; white-space: pre-wrap;">${messageBody.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                This email was sent from your portfolio contact form.
              </p>
            </div>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${messageBody}
          `.trim(),
        });

        if (result.error) {
          // Check if error is due to unverified domain
          if (
            result.error.message?.includes("domain is not verified") ||
            result.error.message?.includes("not verified")
          ) {
            console.warn(
              `Domain verification error: ${result.error.message}. Falling back to default sender.`
            );

            // Retry with default sender if custom domain failed
            if (customDomainEmail && senderEmail !== "onboarding@resend.dev") {
              console.log("Retrying with default sender: onboarding@resend.dev");
              const retryResult = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: recipientEmail,
                replyTo: email,
                subject: `Portfolio Contact: ${subject}`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
                      New Contact Form Submission
                    </h2>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
                      <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Name:</strong> ${name}</p>
                      <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Email:</strong> <a href="mailto:${email}" style="color: #4F46E5;">${email}</a></p>
                      <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Subject:</strong> ${subject}</p>
                      <div style="margin-top: 20px;">
                        <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Message:</strong></p>
                        <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4F46E5; white-space: pre-wrap;">${messageBody.replace(/\n/g, '<br>')}</p>
                      </div>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                      This email was sent from your portfolio contact form.
                    </p>
                    <p style="color: #f59e0b; font-size: 11px; margin-top: 10px; padding: 10px; background-color: #fef3c7; border-radius: 4px;">
                      ⚠️ Note: Your custom domain (${customDomainEmail}) is not verified. Please verify it at <a href="https://resend.com/domains" style="color: #d97706;">resend.com/domains</a> to use it as the sender.
                    </p>
                  </div>
                `,
                text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${messageBody}

Note: Your custom domain (${customDomainEmail}) is not verified. Please verify it at https://resend.com/domains to use it as the sender.
                `.trim(),
              });

              if (retryResult.error) {
                emailError = retryResult.error.message || "Failed to send email even with default sender";
                console.error("Resend API error (retry):", retryResult.error);
              } else {
                emailSent = true;
                console.log("Email sent successfully with default sender:", retryResult.data);
              }
            } else {
              emailError = result.error.message || "Unknown email error";
              console.error("Resend API error:", result.error);
            }
          } else {
            emailError = result.error.message || "Unknown email error";
            console.error("Resend API error:", result.error);
          }
        } else {
          emailSent = true;
          console.log("Email sent successfully:", result.data);
        }
      } catch (err) {
        emailError = err instanceof Error ? err.message : "Failed to send email";
        console.error("Error sending email:", err);
        // Continue execution even if email fails - Discord notification will still work
      }
    } else {
      // Log if Resend API key is not configured
      emailError = "RESEND_API_KEY not configured";
      console.warn("RESEND_API_KEY not configured. Email sending skipped.");
      console.log("Contact form submission:", {
        to: recipientEmail,
        from: email,
        subject: `Portfolio Contact: ${subject}`,
        name,
        message: messageBody,
      });
    }

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
        emailSent,
        ...(emailError && { emailError: "Email sending failed. Check server logs for details." }),
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


