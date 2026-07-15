"use client";

import { type EmailOtpType } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sanitizeAuthNext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Confirming your email…");

  useEffect(() => {
    async function confirmEmail() {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const type = params.get("type");
      const code = params.get("code");
      const next = sanitizeAuthNext(params.get("next"));
      const supabase = createClient();

      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as EmailOtpType,
        });
        if (error) {
          router.replace(
            `/login?error=${encodeURIComponent(error.message)}&step=signin&resend=1&redirectTo=${encodeURIComponent(next)}`,
          );
          return;
        }
        router.replace(next);
        router.refresh();
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          router.replace(
            `/login?error=${encodeURIComponent(error.message)}&step=signin&resend=1&redirectTo=${encodeURIComponent(next)}`,
          );
          return;
        }
        router.replace(next);
        router.refresh();
        return;
      }

      router.replace(
        `/login?error=${encodeURIComponent("Email confirmation failed. Try signing in to resend the link.")}&step=signin&resend=1&redirectTo=${encodeURIComponent(next)}`,
      );
    }

    void confirmEmail().catch(() => {
      setMessage("Something went wrong. Redirecting…");
      router.replace("/login?step=signin&resend=1");
    });
  }, [router]);

  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <p className="text-sm text-zinc-400">{message}</p>
    </div>
  );
}
