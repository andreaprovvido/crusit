import { createAdminClient } from "@/lib/supabase/admin";

export type LoginFlowStep = "email" | "signin" | "signup";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeAuthEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidAuthEmail(email: string) {
  return EMAIL_PATTERN.test(normalizeAuthEmail(email));
}

export async function findAuthUserByEmail(email: string) {
  const admin = createAdminClient();
  const target = normalizeAuthEmail(email);
  let page = 1;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(error.message);

    const users = data.users ?? [];
    const user = users.find((entry) => entry.email?.toLowerCase() === target);
    if (user) return user;
    if (users.length < 1000) return null;
    page += 1;
  }
}

/** Looks up whether an email is already registered in Supabase Auth. */
export async function isEmailRegistered(email: string) {
  const user = await findAuthUserByEmail(email);
  return Boolean(user);
}

/** Marks an existing auth user as email-confirmed (for legacy accounts). */
export async function confirmAuthUserEmail(email: string) {
  const user = await findAuthUserByEmail(email);
  if (!user || user.email_confirmed_at) return;

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(user.id, { email_confirm: true });
  if (error) throw new Error(error.message);
}
