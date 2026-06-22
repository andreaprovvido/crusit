import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    console.error("[waitlist] Supabase env vars not configured");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }

    console.error("[waitlist]", error);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
