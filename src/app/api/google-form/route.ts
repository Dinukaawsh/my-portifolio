import { NextResponse } from "next/server";
import { sendDiscordNotification } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate that we received form data
    // Google Apps Script will send the form responses here
    const formData = body.formData || body;
    const submittedBy = body.submittedBy || body.email || body.name || "Unknown";
    const timestamp = body.timestamp || new Date().toLocaleString();

    // Send Discord notification
    await sendDiscordNotification({
      type: "googleForm",
      data: {
        googleForm: {
          formData,
          timestamp,
          submittedBy: String(submittedBy),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Google Form submission received and notification sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing Google Form submission:", error);
    return NextResponse.json(
      {
        error: "Failed to process Google Form submission",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Allow GET for testing
export async function GET() {
  return NextResponse.json(
    {
      message: "Google Form webhook endpoint is active",
      instructions: "Configure Google Apps Script to POST form submissions to this endpoint",
    },
    { status: 200 }
  );
}
