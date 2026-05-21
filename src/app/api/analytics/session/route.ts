import { NextResponse } from "next/server";
import { sendDiscordNotification } from "@/lib/discord";
import {
  checkRateLimit,
  getClientIp,
  sanitizeText,
} from "@/lib/security";
import type { SessionReportPayload } from "@/lib/session-analytics";

const reportedSessions = new Set<string>();

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`session-report:${ip}`, {
      limit: 30,
      windowMs: 60 * 60 * 1000,
    });
    if (!rate.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = (await request.json()) as SessionReportPayload;

    const sessionId = sanitizeText(body.sessionId, 64);
    if (!sessionId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    if (reportedSessions.has(sessionId)) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const pages = Array.isArray(body.pages) ? body.pages.slice(0, 30) : [];
    if (pages.length === 0) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const startedAt =
      typeof body.startedAt === "number" ? body.startedAt : Date.now();
    const endedAt =
      typeof body.endedAt === "number" ? body.endedAt : Date.now();

    reportedSessions.add(sessionId);
    if (reportedSessions.size > 5000) {
      reportedSessions.clear();
    }

    await sendDiscordNotification({
      type: "session",
      data: {
        session: {
          sessionId: sessionId.slice(0, 12),
          startedAt,
          endedAt,
          pages: pages.map((p) => ({
            path: sanitizeText(p.path, 120) || "/",
            label: sanitizeText(p.label, 80) || p.path || "Page",
            at: typeof p.at === "number" ? p.at : startedAt,
          })),
          userAgent: sanitizeText(body.userAgent, 500) || "Unknown",
          deviceType: ["mobile", "tablet", "desktop", "unknown"].includes(
            body.deviceType
          )
            ? body.deviceType
            : "unknown",
          os: sanitizeText(body.os, 40) || "unknown",
          browser: sanitizeText(body.browser, 40) || "unknown",
          reason: ["leave", "idle", "hidden"].includes(body.reason)
            ? body.reason
            : "leave",
          user: body.user
            ? {
                name: sanitizeText(body.user.name, 120) || undefined,
                email: sanitizeText(body.user.email, 200) || undefined,
                provider: sanitizeText(body.user.provider, 40) || undefined,
              }
            : undefined,
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Session analytics error:", error);
    return NextResponse.json({ error: "Failed to record session" }, { status: 500 });
  }
}
