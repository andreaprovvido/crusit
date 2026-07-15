"use client";

import { FormEvent, useState, useTransition } from "react";
import { checkEmailAction, completeSignUpProfileAction, signInAction } from "@/app/actions";
import type { LoginFlowStep } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { USERNAME_RULE } from "@/lib/username";

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20";

type LoginFlowProps = {
  redirectTo: string;
  initialEmail?: string;
  initialStep?: LoginFlowStep;
  error?: string;
  notice?: string;
};

const STEP_COPY: Record<
  LoginFlowStep,
  { title: string; description: string; stepLabel: string }
> = {
  email: {
    stepLabel: "Step 1 of 2",
    title: "Enter your email",
    description:
      "We ask for your email first and check whether you already have a Crusit account. That way we can show you the right next step — sign in or create an account.",
  },
  signin: {
    stepLabel: "Step 2 of 2",
    title: "Welcome back",
    description:
      "We found a Crusit account for this email. Enter your password to sign in.",
  },
  signup: {
    stepLabel: "Step 2 of 2",
    title: "Create your account",
    description:
      "This email is not registered yet. Choose a public username and a password to join Crusit.",
  },
};

function resolveInitialStep(step?: string, email?: string): LoginFlowStep {
  if ((step === "signin" || step === "signup") && email) {
    return step;
  }
  return "email";
}

export default function LoginFlow({
  redirectTo,
  initialEmail = "",
  initialStep,
  error,
  notice,
}: LoginFlowProps) {
  const [step, setStep] = useState<LoginFlowStep>(() =>
    resolveInitialStep(initialStep, initialEmail),
  );
  const [email, setEmail] = useState(initialEmail);
  const [clientError, setClientError] = useState<string | null>(null);
  const [clientNotice, setClientNotice] = useState<string | null>(null);
  const [isChecking, startCheckTransition] = useTransition();
  const [isSigningUp, startSignUpTransition] = useTransition();

  const copy = STEP_COPY[step];
  const displayError = error ?? clientError;
  const displayNotice = notice ?? clientNotice;

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);

    startCheckTransition(async () => {
      const result = await checkEmailAction(email);
      if (result.error) {
        setClientError(result.error);
        return;
      }

      if (result.email) {
        setEmail(result.email);
      }

      setStep(result.registered ? "signin" : "signup");
    });
  }

  function handleBack() {
    setClientError(null);
    setClientNotice(null);
    setStep("email");
  }

  function handleSignUpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);
    setClientNotice(null);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    startSignUpTransition(async () => {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setClientError(signUpError.message);
        return;
      }

      const userId = data.user?.id;
      if (!userId) {
        setClientError("Something went wrong. Please try again.");
        return;
      }

      const profileResult = await completeSignUpProfileAction(userId, username);
      if (profileResult.error) {
        setClientError(profileResult.error);
        return;
      }

      if (!data.session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setStep("signin");
          setClientNotice("Account created. Sign in with your new password.");
          return;
        }
      }

      window.location.assign(redirectTo);
    });
  }

  return (
    <div className="mt-8">
      {displayNotice ? (
        <p className="mb-6 rounded-xl border border-sky-900/50 bg-sky-950/30 p-4 text-sm text-sky-300">
          {displayNotice}
        </p>
      ) : null}

      {displayError ? (
        <p className="mb-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          {displayError}
        </p>
      ) : null}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{copy.stepLabel}</p>
        <h2 className="mt-2 text-lg font-semibold text-white">{copy.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{copy.description}</p>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
            <label className="block text-sm text-zinc-300">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isChecking}
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>
            <button
              type="submit"
              disabled={isChecking}
              className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isChecking ? "Checking…" : "Continue"}
            </button>
          </form>
        ) : null}

        {step === "signin" ? (
          <form action={signInAction} className="mt-6 space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <input type="hidden" name="email" value={email} />
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-300">
              <span className="text-zinc-500">Email</span>
              <p className="font-medium text-white">{email}</p>
            </div>
            <label className="block text-sm text-zinc-300">
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full text-sm text-zinc-500 hover:text-zinc-300"
            >
              Use a different email
            </button>
          </form>
        ) : null}

        {step === "signup" ? (
          <form onSubmit={handleSignUpSubmit} className="mt-6 space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-300">
              <span className="text-zinc-500">Email</span>
              <p className="font-medium text-white">{email}</p>
            </div>
            <label className="block text-sm text-zinc-300">
              Username
              <input
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={20}
                pattern="[A-Za-z0-9_]{3,20}"
                autoComplete="username"
                placeholder="e.g. cruiser_92"
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-zinc-500">
                Shown publicly on your reviews. {USERNAME_RULE}
              </span>
            </label>
            <label className="block text-sm text-zinc-300">
              Password
              <input
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-zinc-500">At least 6 characters.</span>
            </label>
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningUp ? "Creating account…" : "Create account"}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full text-sm text-zinc-500 hover:text-zinc-300"
            >
              Use a different email
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
