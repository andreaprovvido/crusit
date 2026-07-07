import type { Metadata } from "next";
import Link from "next/link";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Crusit",
  description:
    "How Crusit collects, uses, and protects your personal data — the information you share, third-party services we rely on, and your privacy rights.",
  path: "/privacy",
});

const LAST_UPDATED = "July 7, 2026";
const CONTACT_EMAIL = "privacy@crusit.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-10">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">Legal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-zinc-300">
          <section>
            <p>
              This Privacy Policy explains how {SITE_NAME} (&quot;Crusit&quot;,
              &quot;we&quot;, &quot;us&quot;) collects, uses, and protects your
              information when you use our website and services. Crusit is a
              community-powered platform for discovering and reviewing gay cruising
              spots. By using Crusit, you agree to the practices described here.
            </p>
            <p className="mt-4">
              Crusit is intended for adults aged 18 or over. We do not knowingly
              collect data from anyone under 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Information we collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-200">Account data:</strong> your email
                address, a username you choose, and an encrypted password when you
                register.
              </li>
              <li>
                <strong className="text-zinc-200">Content you submit:</strong> spots
                you add (including names, descriptions, addresses, and map
                coordinates), ratings, and reviews.
              </li>
              <li>
                <strong className="text-zinc-200">Usage &amp; device data:</strong>{" "}
                anonymous analytics such as pages viewed, approximate region, browser,
                and device type, collected to improve the service.
              </li>
              <li>
                <strong className="text-zinc-200">Cookies:</strong> essential cookies
                for authentication (keeping you signed in) and analytics cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">How we use your information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>To create and secure your account and keep you signed in.</li>
              <li>To publish the spots, ratings, and reviews you contribute.</li>
              <li>To operate, maintain, and improve the platform and its features.</li>
              <li>To prevent abuse, spam, fraud, and violations of our rules.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">What is shown publicly</h2>
            <p className="mt-4">
              To protect your privacy, your email address is{" "}
              <strong className="text-zinc-200">never shown publicly</strong>. When you
              post a rating or review, only your chosen{" "}
              <strong className="text-zinc-200">username</strong> is displayed. Spots
              and reviews you submit are publicly visible to all visitors. Please avoid
              including personal or identifying information in the content you post.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Third-party services</h2>
            <p className="mt-4">
              We rely on trusted providers to run Crusit. These providers process data
              on our behalf under their own privacy terms:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-200">Supabase</strong> — database,
                authentication, and secure storage of account data.
              </li>
              <li>
                <strong className="text-zinc-200">Vercel</strong> — website hosting and
                content delivery.
              </li>
              <li>
                <strong className="text-zinc-200">Google Analytics</strong> — anonymous
                usage statistics.
              </li>
              <li>
                <strong className="text-zinc-200">MapTiler</strong> — maps and address
                search.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal data to anyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Data retention</h2>
            <p className="mt-4">
              We keep your account data for as long as your account is active. Public
              content you post may remain visible even after edits. When you delete your
              account, we remove or anonymize your personal data, except where we must
              retain it to comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Your rights</h2>
            <p className="mt-4">
              Depending on where you live (for example under the EU/UK GDPR), you may
              have the right to access, correct, export, or delete your personal data,
              and to object to or restrict certain processing. You can update your
              username and password anytime from your{" "}
              <Link href="/profile" className="text-emerald-400 hover:text-emerald-300">
                profile page
              </Link>
              . To exercise other rights, contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Security</h2>
            <p className="mt-4">
              Passwords are stored encrypted and connections are secured with HTTPS. No
              method of transmission or storage is completely secure, but we take
              reasonable measures to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Changes to this policy</h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. When we do, we will
              revise the &quot;Last updated&quot; date above. Significant changes will
              be communicated where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p className="mt-4">
              For any questions about this Privacy Policy or your data, contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
