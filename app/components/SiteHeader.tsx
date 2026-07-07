import SiteHeaderBar from "@/app/components/SiteHeaderBar";
import { createClient } from "@/lib/supabase/server";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();
    username = profile?.username ?? null;
  }

  return (
    <header className="relative z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <SiteHeaderBar isAuthenticated={Boolean(user)} username={username} />
    </header>
  );
}
