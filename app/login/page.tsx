import type { Metadata } from "next";
import Link from "next/link";
import LoginFlow from "@/app/components/auth/LoginFlow";
import type { LoginFlowStep } from "@/lib/auth";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sign In | Crusit",
  description:
    "Sign in or create a free Crusit account to add gay cruising spots, leave ratings, and write community reviews.",
  path: "/login",
  index: false,
});

type PageProps = {
  searchParams: Promise<{
    error?: string;
    notice?: string;
    redirectTo?: string;
    email?: string;
    step?: string;
  }>;
};

function parseStep(step?: string): LoginFlowStep | undefined {
  if (step === "email" || step === "signin" || step === "signup") {
    return step;
  }
  return undefined;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const redirectTo = query.redirectTo ?? "/spots";

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-white">Sign in to Crusit</h1>
      <p className="mt-3 text-sm text-zinc-400">
        Create spots, leave ratings, and write reviews.
      </p>

      <LoginFlow
        redirectTo={redirectTo}
        initialEmail={query.email}
        initialStep={parseStep(query.step)}
        error={query.error}
        notice={query.notice}
      />

      <p className="mt-6 text-center text-sm text-zinc-500">
        <Link href="/spots" className="hover:text-zinc-300">
          Continue browsing without signing in
        </Link>
      </p>
    </div>
  );
}
