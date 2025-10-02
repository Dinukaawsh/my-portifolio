import { NextResponse } from "next/server";

export async function GET() {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
  return NextResponse.json({ ok: true, hasWebhook: Boolean(webhookUrl) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userAgent = request.headers.get("user-agent") || "unknown";
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        {
          error: "Discord webhook not configured",
          hint: "Set NEXT_PUBLIC_DISCORD_WEBHOOK_URL in environment",
        },
        { status: 500 }
      );
    }

    const now = new Date().toISOString();

    const embed = {
      title: "📄 CV Preview Opened!",
      color: 0x00ff00, // Green
      fields: [
        {
          name: "⏰ Time",
          value: now,
          inline: true,
        },
        {
          name: "🌍 IP Address",
          value: ip,
          inline: true,
        },
        {
          name: "📱 User Agent",
          value:
            userAgent.length > 100
              ? userAgent.substring(0, 100) + "..."
              : userAgent,
          inline: false,
        },
        {
          name: "🔗 Source",
          value: body?.source || "Unknown",
          inline: true,
        },
      ],
      timestamp: now,
      footer: {
        text: "Portfolio CV Analytics",
      },
    };

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [embed],
        username: "Portfolio Bot",
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { error: "Failed to notify Discord", details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error", details: String(error) },
      { status: 500 }
    );
  }
}
