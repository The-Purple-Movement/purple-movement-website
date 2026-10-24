import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { badRequest, clientIp, insertedId, isHttpUrl, logDbError, optionalString, readJson } from "@/lib/api";
import { JOIN_LIMITS, getJoinPath } from "@/content/join";

/**
 * POST /api/join — request and response shapes are unchanged:
 * { selectedRole, defining, whyHere, portfolioLink?, name?, email?, phone?, notInterested }
 * → 201 { success, message, applicationId } | 400/500 { error }
 */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  if (!body) return badRequest("Request body must be a JSON object");

  const { selectedRole, defining, whyHere, notInterested } = body;

  if (typeof selectedRole !== "string" || typeof defining !== "string" || typeof whyHere !== "string") {
    return badRequest("Missing required fields: selectedRole, defining, or whyHere");
  }
  if (!getJoinPath(selectedRole)) return badRequest("Unknown selectedRole");
  if (!defining.trim() || defining.length > 300) return badRequest("Invalid defining category");
  if (!whyHere.trim() || whyHere.length > JOIN_LIMITS.contributionMax) return badRequest("Invalid whyHere");

  const portfolioLink = optionalString(body.portfolioLink, JOIN_LIMITS.linkMax);
  if (portfolioLink === undefined || (portfolioLink && !isHttpUrl(portfolioLink))) {
    return badRequest("portfolioLink must be an http(s) URL");
  }

  const anonymous = notInterested === true;
  let name: string | null = null;
  let email: string | null = null;
  let phone: string | null = null;

  if (!anonymous) {
    if (typeof body.name !== "string" || typeof body.email !== "string" || typeof body.phone !== "string" ||
        !body.name.trim() || !body.email.trim() || !body.phone.trim()) {
      return badRequest("Personal details are required when not opted out");
    }
    name = body.name.trim();
    email = body.email.trim();
    phone = body.phone.trim();
    if (name.length > JOIN_LIMITS.nameMax) return badRequest("Name is too long");
    if (email.length > JOIN_LIMITS.emailMax || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return badRequest("Invalid email format");
    }
    const digits = phone.replace(/[^\d]/g, "");
    if (digits.length < 10 || digits.length > 15) return badRequest("Phone number must be at least 10 digits");
  }

  const { data, error } = await supabaseAdmin
    .from("join_applications")
    .insert([
      {
        selected_role: selectedRole,
        defining_category: defining,
        why_here: whyHere.trim(),
        portfolio_link: portfolioLink,
        name,
        email,
        phone,
        not_interested: anonymous,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? "",
        ip_address: clientIp(request),
      },
    ])
    .select("id");

  if (error) {
    logDbError("join", error);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }

  return NextResponse.json(
    { success: true, message: "Application submitted successfully", applicationId: insertedId(data) },
    { status: 201 },
  );
}
