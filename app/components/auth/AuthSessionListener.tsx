"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sanitizeAuthNext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

/**
 * Picks up Supabase auth tokens when email links land on the wrong page
 * (e.g. homepage with hash fragments) and Supabase redirect URLs are misconfigured.
 */
export default function AuthSessionListener() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;
    const hasHashTokens =
      hash.includes("access_token=") ||
      hash.includes("refresh_token=") ||
      hash.includes("type=signup");
    const hasQueryCode = search.includes("code=");

    if (!hasHashTokens && !hasQueryCode) {
      return;
    }

    if (hasQueryCode && !window.location.pathname.startsWith("/auth/callback")) {
      const params = new URLSearchParams(search);
      const callback = new URL("/auth/callback", window.location.origin);
      params.forEach((value, key) => callback.searchParams.set(key, value));
      if (!callback.searchParams.has("next")) {
        callback.searchParams.set("next", sanitizeAuthNext(null));
      }
      router.replace(`${callback.pathname}${callback.search}`);
      return;
    }

    if (!hasHashTokens) {
      return;
    }

    const supabase = createClient();
    void supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        if (hash.includes("error=")) {
          router.replace("/login?error=Email+confirmation+failed.+Try+signing+in+to+resend+the+link.");
        }
        return;
      }

      const hashParams = new URLSearchParams(hash.slice(1));
      const next = sanitizeAuthNext(hashParams.get("next"));
      window.history.replaceState(null, "", window.location.pathname);
      router.replace(next);
      router.refresh();
    });
  }, [router]);

  return null;
}
