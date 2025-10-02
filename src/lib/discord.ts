// Discord Webhook Integration
export interface DiscordNotification {
  type: "visit" | "comment";
  data: {
    visitor?: {
      ip?: string;
      userAgent?: string;
      deviceType?: "mobile" | "tablet" | "desktop" | "unknown";
      os?: string;
      browser?: string;
      timestamp: string;
      page: string;
      sessionId?: string;
      isNewSession?: boolean;
    };
    comment?: {
      name: string;
      email: string;
      message: string;
      rating: number;
      timestamp: string;
    };
  };
}

export async function sendDiscordNotification(
  notification: DiscordNotification
) {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord webhook URL not configured");
    return;
  }

  try {
    const embed = createDiscordEmbed(notification);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
        username: "Portfolio Bot",
        avatar_url: "https://cdn.discordapp.com/emojis/1234567890.png", // Optional: custom bot avatar
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    console.log("Discord notification sent successfully");
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
  }
}

function createDiscordEmbed(notification: DiscordNotification) {
  const { type, data } = notification;

  if (type === "visit") {
    return {
      title: "🌐 New Portfolio Visitor!",
      color: 0x00ff00, // Green
      fields: [
        {
          name: "📱 Page Visited",
          value: data.visitor?.page || "Unknown",
          inline: true,
        },
        {
          name: "⏰ Time",
          value: data.visitor?.timestamp || "Unknown",
          inline: true,
        },
        {
          name: "🆔 Session",
          value: data.visitor?.isNewSession
            ? `🆕 New Session (${data.visitor?.sessionId || "Unknown"})`
            : `🔄 Returning (${data.visitor?.sessionId || "Unknown"})`,
          inline: true,
        },
        ...(data.visitor?.deviceType
          ? [
              {
                name: "🖥️ Device",
                value: data.visitor.deviceType,
                inline: true,
              },
            ]
          : []),
        ...(data.visitor?.os
          ? [
              {
                name: "🧠 OS",
                value: data.visitor.os,
                inline: true,
              },
            ]
          : []),
        ...(data.visitor?.browser
          ? [
              {
                name: "🌐 Browser",
                value: data.visitor.browser,
                inline: true,
              },
            ]
          : []),
        {
          name: "🌍 User Agent",
          value: data.visitor?.userAgent
            ? data.visitor.userAgent.substring(0, 100) + "..."
            : "Unknown",
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio Analytics",
      },
    };
  } else if (type === "comment") {
    return {
      title: "💬 New Comment Received!",
      color: 0x0099ff, // Blue
      fields: [
        {
          name: "👤 Name",
          value: data.comment?.name || "Anonymous",
          inline: true,
        },
        {
          name: "📧 Email",
          value: data.comment?.email || "No email",
          inline: true,
        },
        {
          name: "⭐ Rating",
          value: data.comment?.rating
            ? `${data.comment.rating}/5 ${"★".repeat(
                data.comment.rating
              )}${"☆".repeat(5 - data.comment.rating)}`
            : "No rating",
          inline: true,
        },
        {
          name: "💭 Message",
          value: data.comment?.message
            ? data.comment.message.length > 100
              ? data.comment.message.substring(0, 100) + "..."
              : data.comment.message
            : "No message",
          inline: false,
        },
        {
          name: "⏰ Time",
          value: data.comment?.timestamp || "Unknown",
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio Comments",
      },
    };
  }

  return {
    title: "❓ Unknown Notification Type",
    color: 0xff0000, // Red
    description: "Received an unknown notification type",
    timestamp: new Date().toISOString(),
  };
}
