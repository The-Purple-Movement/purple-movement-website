import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { badRequest, clientIp, insertedId, logDbError, optionalString, readJson } from "@/lib/api";

/** POST /api/questions — { question, timestamp } → 201 { message, id } | 400/500 { error } */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  if (!body) return badRequest("Request body must be a JSON object");

  const question = optionalString(body.question, 1000);
  if (!question) return badRequest("Question is required");

  const { data, error } = await supabaseAdmin
    .from("contact_questions")
    .insert([
      {
        question_text: question,
        status: "pending",
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        ip_address: clientIp(request),
      },
    ])
    .select("id");

  if (error) {
    logDbError("questions", error);
    return NextResponse.json({ error: "Failed to save question" }, { status: 500 });
  }

  return NextResponse.json({ message: "Question submitted successfully", id: insertedId(data) }, { status: 201 });
}
