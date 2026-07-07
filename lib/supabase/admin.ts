import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client authenticated with the service role key. It bypasses RLS and
 * has full access to the database and the auth admin API.
 *
 * SECURITY: only ever import this from server-side code (server actions,
 * server components, route handlers). Never expose the returned client or the
 * service role key to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
