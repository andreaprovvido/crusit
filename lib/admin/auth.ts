import { timingSafeEqual } from "node:crypto";
import { notFound, redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/** Emails allowed into the admin panel, from the ADMIN_EMAILS env var. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

/** Whether the URL segment matches the secret ADMIN_PANEL_KEY. */
export function isPanelKeyValid(key: string): boolean {
  const expected = process.env.ADMIN_PANEL_KEY ?? "";
  if (expected.length === 0) return false;
  return safeEqual(key, expected);
}

/** Returns the signed-in user if they are an allowed admin, otherwise null. */
export async function getCurrentAdmin(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  if (!getAdminEmails().includes(user.email.toLowerCase())) return null;
  return user;
}

/**
 * Gate for admin pages and actions. 404s on a wrong secret key (hides the
 * panel's existence) and redirects non-admins to the studio login screen.
 */
export async function requireAdmin(key: string): Promise<User> {
  if (!isPanelKeyValid(key)) notFound();
  const admin = await getCurrentAdmin();
  if (!admin) redirect(`/studio/${key}/login`);
  return admin;
}
