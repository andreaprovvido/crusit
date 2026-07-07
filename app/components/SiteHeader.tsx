import { signOutAction } from "@/app/actions";
import SiteHeaderBar from "@/app/components/SiteHeaderBar";
import { createClient } from "@/lib/supabase/server";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="relative z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <SiteHeaderBar userEmail={user?.email ?? null} signOutAction={signOutAction} />
    </header>
  );
}
