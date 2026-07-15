import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { normalizeAuthEmail, sanitizeAuthNext } from "@/lib/auth";
import { createRouteHandlerClient } from "@/lib/supabase/route-handler";

function loginErrorRedirect(request: NextRequest, message: string, email?: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", message);
  loginUrl.searchParams.set("step", "signin");
  if (email) loginUrl.searchParams.set("email", email);
  loginUrl.searchParams.set("redirectTo", sanitizeAuthNext(null));
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const next = sanitizeAuthNext(requestUrl.searchParams.get("next"));
  const emailHint = requestUrl.searchParams.get("email") ?? undefined;

  if (!code && !(tokenHash && type)) {
    return loginErrorRedirect(
      request,
      "Email confirmation failed. The link may have expired — try signing in to resend it.",
      emailHint,
    );
  }

  const successUrl = new URL(next, requestUrl.origin);
  const response = NextResponse.redirect(successUrl);
  response.headers.set("Cache-Control", "private, no-store");

  const supabase = createRouteHandlerClient(request, response);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return loginErrorRedirect(request, error.message, emailHint);
    }
    return response;
  }

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash!,
    type: type as EmailOtpType,
  });
  if (error) {
    return loginErrorRedirect(request, error.message, emailHint);
  }

  return response;
}
