import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPanelKeyValid } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!isPanelKeyValid(key)) notFound();

  return <div className="min-h-screen bg-zinc-950 text-white">{children}</div>;
}
