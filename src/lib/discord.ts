import {
  formatDuration,
  formatPageList,
} from "@/lib/session-analytics";

// Discord Webhook Integration
export interface DiscordNotification {
  type:
    | "visit"
    | "session"
    | "comment"
    | "registration"
    | "feedback"
    | "contact"
    | "googleForm";
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
    session?: {
      sessionId: string;
      startedAt: number;
      endedAt: number;
      pages: { path: string; label: string; at: number }[];
      userAgent: string;
      deviceType: "mobile" | "tablet" | "desktop" | "unknown";
      os: string;
      browser: string;
      reason: "leave" | "idle" | "hidden";
      user?: {
        name?: string;
        email?: string;
        provider?: string;
      };
    };
    comment?: {
      name: string;
      email: string;
      message: string;
      rating: number;
      timestamp: string;
    };
    registration?: {
      name: string;
      email: string;
      provider: string;
      image?: string;
      timestamp: string;
    };
    feedback?: {
      name: string;
      email: string;
      role: string;
      message: string;
      rating: number;
      provider: string;
      image?: string;
      timestamp: string;
    };
    contact?: {
      name: string;
      email: string;
      subject: string;
      message: string;
      timestamp: string;
    };
    googleForm?: {
      formData?: Record<string, unknown>;
      timestamp: string;
      submittedBy?: string;
      formUrl?: string;
    };
  };
}

export async function sendDiscordNotification(
  notification: DiscordNotification
) {
  const webhookUrl =
    process.env.DISCORD_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

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

  if (type === "session" && data.session) {
    const s = data.session;
    const duration = formatDuration(s.endedAt - s.startedAt);
    const pageList = formatPageList(s.pages);
    const reasonLabel =
      s.reason === "idle"
        ? "Session idle timeout"
        : s.reason === "hidden"
          ? "Tab closed / navigated away"
          : "Visitor left site";

    const fields = [
      {
        name: "⏱️ Duration",
        value: duration,
        inline: true,
      },
      {
        name: "📄 Pages viewed",
        value: String(s.pages.length),
        inline: true,
      },
      {
        name: "🆔 Session",
        value: s.sessionId,
        inline: true,
      },
      {
        name: "🛤️ Journey",
        value: pageList || "—",
        inline: false,
      },
      {
        name: "🖥️ Device",
        value: `${s.deviceType} · ${s.os} · ${s.browser}`,
        inline: true,
      },
      {
        name: "📤 End reason",
        value: reasonLabel,
        inline: true,
      },
      {
        name: "🕐 Started",
        value: new Date(s.startedAt).toLocaleString(),
        inline: true,
      },
    ];

    if (s.user?.name || s.user?.email) {
      fields.unshift({
        name: "👤 Signed in",
        value: [s.user.name, s.user.email, s.user.provider]
          .filter(Boolean)
          .join(" · "),
        inline: false,
      });
    }

    return {
      title: "📊 Portfolio session summary",
      color: 0x5865f2,
      fields,
      timestamp: new Date(s.endedAt).toISOString(),
      footer: { text: "Portfolio Analytics · one notification per visit" },
    };
  }

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
  } else if (type === "registration") {
    return {
      title: "🎉 New User Registration!",
      color: 0xff6b35, // Orange
      thumbnail: {
        url: data.registration?.image || undefined,
      },
      fields: [
        {
          name: "👤 Name",
          value: data.registration?.name || "Unknown",
          inline: true,
        },
        {
          name: "📧 Email",
          value: data.registration?.email || "No email",
          inline: true,
        },
        {
          name: "🔐 Provider",
          value: data.registration?.provider || "Unknown",
          inline: true,
        },
        {
          name: "⏰ Registration Time",
          value: data.registration?.timestamp || "Unknown",
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio User Registration",
      },
    };
  } else if (type === "feedback") {
    return {
      title: "💡 New Feedback Received!",
      color: 0x9b59b6, // Purple
      thumbnail: {
        url: data.feedback?.image || undefined,
      },
      fields: [
        {
          name: "👤 Name",
          value: data.feedback?.name || "Anonymous",
          inline: true,
        },
        {
          name: "📧 Email",
          value: data.feedback?.email || "No email",
          inline: true,
        },
        {
          name: "🎭 Role",
          value: data.feedback?.role || "Unknown",
          inline: true,
        },
        {
          name: "🔐 Provider",
          value: data.feedback?.provider || "Unknown",
          inline: true,
        },
        {
          name: "⭐ Rating",
          value: data.feedback?.rating
            ? `${data.feedback.rating}/5 ${"★".repeat(
                data.feedback.rating
              )}${"☆".repeat(5 - data.feedback.rating)}`
            : "No rating",
          inline: true,
        },
        {
          name: "💭 Feedback",
          value: data.feedback?.message
            ? data.feedback.message.length > 200
              ? data.feedback.message.substring(0, 200) + "..."
              : data.feedback.message
            : "No message",
          inline: false,
        },
        {
          name: "⏰ Time",
          value: data.feedback?.timestamp || "Unknown",
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio Feedback",
      },
    };
  } else if (type === "contact") {
    return {
      title: "📧 New Contact Form Submission!",
      color: 0x00d4ff, // Cyan
      fields: [
        {
          name: "👤 Name",
          value: data.contact?.name || "Anonymous",
          inline: true,
        },
        {
          name: "📧 Email",
          value: data.contact?.email || "No email",
          inline: true,
        },
        {
          name: "📌 Subject",
          value: data.contact?.subject || "No subject",
          inline: false,
        },
        {
          name: "💬 Message",
          value: data.contact?.message
            ? data.contact.message.length > 500
              ? data.contact.message.substring(0, 500) + "..."
              : data.contact.message
            : "No message",
          inline: false,
        },
        {
          name: "⏰ Time",
          value: data.contact?.timestamp || "Unknown",
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio Contact Form",
      },
    };
  } else if (type === "googleForm") {
    const formData = data.googleForm?.formData || {};
    const formUrl = data.googleForm?.formUrl;
    const fields = Object.entries(formData)
      .slice(0, 9) // Limit to 9 fields to make room for form link and time
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
        value: typeof value === "string" && value.length > 1024
          ? value.substring(0, 1020) + "..."
          : String(value || "N/A"),
        inline: false,
      }));

    // Build fields array with form link if available
    const allFields = fields.length > 0 ? [...fields] : [];

    // Add form link field if URL is available
    if (formUrl) {
      allFields.push({
        name: "🔗 View Form & Responses",
        value: `[Click here to open Google Form](${formUrl})`,
        inline: false,
      });
    }

    // Add timestamp
    allFields.push({
      name: "⏰ Time",
      value: data.googleForm?.timestamp || new Date().toLocaleString(),
      inline: true,
    });

    return {
      title: "📋 New Google Form Submission!",
      color: 0x4285f4, // Google Blue
      description: data.googleForm?.submittedBy
        ? `Submitted by: ${data.googleForm.submittedBy}`
        : "Someone submitted your Hire Me form",
      fields: allFields,
      timestamp: new Date().toISOString(),
      footer: {
        text: "Google Form Submission",
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
