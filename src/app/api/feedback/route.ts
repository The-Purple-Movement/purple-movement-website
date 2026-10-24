import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { badRequest, clientIp, insertedId, logDbError, optionalString, readJson } from "@/lib/api";

const REACTIONS = new Set(["very-sad", "sad", "neutral", "happy", "very-happy"]);

/** POST /api/feedback — { reaction?, feedback?, timestamp } → 201 { message, id } | 400/500 { error } */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  if (!body) return badRequest("Request body must be a JSON object");

  const reaction = body.reaction ?? null;
  if (reaction !== null && (typeof reaction !== "string" || !REACTIONS.has(reaction))) {
    return badRequest("Invalid reaction");
  }
  const feedback = optionalString(body.feedback, 2000);
  if (feedback === undefined) return badRequest("Feedback must be text of at most 2000 characters");
  if (!reaction && !feedback) return badRequest("Either reaction or feedback is required");

  const { data, error } = await supabaseAdmin
    .from("feedback_submissions")
    .insert([
      {
        reaction,
        feedback_text: feedback,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        ip_address: clientIp(request),
      },
    ])
    .select("id");

  if (error) {
    logDbError("feedback", error);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }

  return NextResponse.json({ message: "Feedback submitted successfully", id: insertedId(data) }, { status: 201 });
}
