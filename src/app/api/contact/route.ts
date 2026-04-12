import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form proxy (optional): Web3Forms documents that **server-side** API calls
 * require a paid plan + server IP whitelisting; free tier should submit from the
 * browser (see Footer). This route remains for Pro users or custom integrations.
 *
 * Rate limiting uses in-memory storage (best-effort). On multi-instance serverless
 * deploys each instance has its own bucket; use Upstash Redis + @upstash/ratelimit
 * if you need a shared global limit.
 */

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 10;
const hitLog = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function rateLimitAllow(ip: string): boolean {
  const now = Date.now();
  const start = now - RATE_WINDOW_MS;
  const hits = (hitLog.get(ip) ?? []).filter((t) => t > start);
  if (hits.length >= RATE_MAX) return false;
  hits.push(now);
  hitLog.set(ip, hits);
  if (hitLog.size > 20_000) hitLog.clear();
  return true;
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  const local = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;
  const lan =
    /^https?:\/\/(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?$/i;
  if (local.test(origin) || lan.test(origin)) return true;
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const allowed = new Set(
    [
      site,
      "https://rdabacuznadiad.com",
      "https://www.rdabacuznadiad.com",
    ].filter(Boolean)
  );
  return allowed.has(origin);
}

function web3AccessKey(): string | undefined {
  return process.env.WEB3FORMS_ACCESS_KEY?.trim();
}

function validateMobile(val: string): boolean {
  return /^[6-9]\d{9}$/.test(val.trim());
}

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const botcheck = typeof b.botcheck === "string" ? b.botcheck : "";
  if (botcheck.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = clientIp(req);
  if (!rateLimitAllow(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const mobile = typeof b.mobile === "string" ? b.mobile.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message =
    typeof b.message === "string" ? b.message.trim().slice(0, 200) : "";

  if (name.length < 2 || !validateMobile(mobile) || !validateEmail(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const accessKey = web3AccessKey();
  if (!accessKey) {
    console.error(
      "contact: missing WEB3FORMS_ACCESS_KEY (use browser form + NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY for free tier)"
    );
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const fd = new FormData();
    fd.append("access_key", accessKey);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("phone", mobile);
    if (message) fd.append("message", message);
    fd.append("from_name", "R D Abacus Nadiad Website");
    fd.append("subject", "New demo enquiry — website");

    const upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
      headers: {
        Accept: "application/json",
        "User-Agent": "RDAbacus-Nadiad/1.0 (Next.js API contact)",
      },
    });

    const raw = await upstream.text();
    let json: { success?: boolean; message?: string };
    try {
      json = JSON.parse(raw) as { success?: boolean; message?: string };
    } catch {
      console.error("web3forms non-JSON response", {
        status: upstream.status,
        snippet: raw.slice(0, 200),
      });
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    if (!upstream.ok || !json.success) {
      console.error("web3forms error", {
        status: upstream.status,
        message: json.message,
      });
      return NextResponse.json(
        { ok: false },
        { status: process.env.NODE_ENV === "production" ? 502 : upstream.status }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("contact route failure", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

/** No other methods — explicit allow list */
export function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
