import { NextResponse, type NextRequest } from "next/server";

/** First address in X-Forwarded-For, else X-Real-IP, else null. Stored for abuse investigation only. */
export function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim();
  return ip || null;
}

export async function readJson(request: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

/**
 * Logs a database failure without its details: Postgres constraint errors echo the failing row,
 * which would put submitted personal data into server logs.
 */
export function logDbError(context: string, error: { code?: string } | null | undefined) {
  console.error(`[${context}] database insert failed`, { code: error?.code || "unknown" });
}

export function optionalString(value: unknown, max: number): string | null | undefined {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || value.length > max) return undefined; // undefined = invalid
  return value.trim() || null;
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Pulls the inserted row id from a Supabase insert().select() response. */
export function insertedId(data: unknown): string | null {
  if (Array.isArray(data)) return (data[0] as { id?: string } | undefined)?.id ?? null;
  return null;
}
