import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function redirectAuthParamsToCallback(request: NextRequest) {
  if (request.nextUrl.pathname === "/auth/callback") {
    return null;
  }

  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");

  if (!code && !(tokenHash && type)) {
    return null;
  }

  const callbackUrl = request.nextUrl.clone();
  callbackUrl.pathname = "/auth/callback";
  return NextResponse.redirect(callbackUrl);
}

export async function middleware(request: NextRequest) {
  const authRedirect = redirectAuthParamsToCallback(request);
  if (authRedirect) {
    return authRedirect;
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
