import { createClient } from "@/lib/supabase/server";

export type SiteContent = {
  key: string;
  title: string;
  body: string;
};

const FALLBACKS: Record<string, SiteContent> = {
  about: {
    key: "about",
    title: "The community map for gay cruising",
    body: "Crusit is an open, community-powered platform for discovering gay cruising spots — places where men and LGBTQ+ people meet for casual, consensual sexual encounters. We make that world easier to navigate with real locations, honest reviews, and a safety-first mindset.",
  },
};

/**
 * Public read for editable site copy. Falls back to a built-in default when
 * the row (or the table) does not yet exist, so pages never crash.
 */
export async function getSiteContent(key: string): Promise<SiteContent> {
  const fallback = FALLBACKS[key] ?? { key, title: "", body: "" };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, title, body")
      .eq("key", key)
      .maybeSingle();

    if (error || !data) return fallback;
    return {
      key: data.key as string,
      title: (data.title as string) || fallback.title,
      body: (data.body as string) || fallback.body,
    };
  } catch {
    return fallback;
  }
}
