import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NewSpotForm from "@/app/components/spots/NewSpotForm";
import { createSpotAction } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Add a new spot",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewSpotPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/spots/new");
  }

  const query = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-4xl font-bold tracking-tight text-white">Add a new spot</h1>
      <p className="mt-3 text-zinc-400">
        Share a location with the community. All spots are public and visible to everyone.
      </p>

      {query.error ? (
        <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          {query.error}
        </p>
      ) : null}

      <NewSpotForm action={createSpotAction} />
    </div>
  );
}
