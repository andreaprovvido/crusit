"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminEmails, isPanelKeyValid, requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { buildSpotSlug, slugify } from "@/lib/slug";
import { DEFAULT_SPOT_TYPE, isSpotType } from "@/lib/spotTypes";

function studioPath(key: string, sub = "") {
  return `/studio/${key}${sub}`;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export async function studioSignInAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  if (!isPanelKeyValid(key)) redirect("/");

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`${studioPath(key, "/login")}?error=${encodeURIComponent(error.message)}`);
  }

  if (!getAdminEmails().includes(email.toLowerCase())) {
    await supabase.auth.signOut();
    redirect(`${studioPath(key, "/login")}?error=${encodeURIComponent("This account is not an admin.")}`);
  }

  redirect(studioPath(key));
}

export async function studioSignOutAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(studioPath(key, "/login"));
}

// ---------------------------------------------------------------------------
// Spots
// ---------------------------------------------------------------------------
function readSpotFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    streetAddress: String(formData.get("streetAddress") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    province: String(formData.get("province") ?? "").trim(),
    region: String(formData.get("region") ?? "").trim(),
    postalCode: String(formData.get("postalCode") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    spotType: (() => {
      const raw = String(formData.get("spotType") ?? "").trim();
      return isSpotType(raw) ? raw : DEFAULT_SPOT_TYPE;
    })(),
    latitude: Number(formData.get("latitude")),
    longitude: Number(formData.get("longitude")),
  };
}

export async function adminCreateSpotAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const fields = readSpotFields(formData);
  if (
    !fields.name ||
    !fields.description ||
    !fields.city ||
    !fields.country ||
    Number.isNaN(fields.latitude) ||
    Number.isNaN(fields.longitude)
  ) {
    redirect(`${studioPath(key, "/spots/new")}?error=missing-fields`);
  }

  const supabase = await createClient();
  const slug = buildSpotSlug(fields.name, crypto.randomUUID().slice(0, 8));

  const { error } = await supabase.rpc("create_spot", {
    p_slug: slug,
    p_name: fields.name,
    p_description: fields.description,
    p_street_address: fields.streetAddress,
    p_city: fields.city,
    p_province: fields.province,
    p_region: fields.region,
    p_postal_code: fields.postalCode,
    p_country: fields.country,
    p_spot_type: fields.spotType,
    p_latitude: fields.latitude,
    p_longitude: fields.longitude,
  });

  if (error) {
    redirect(`${studioPath(key, "/spots/new")}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/spots");
  redirect(studioPath(key, "/spots"));
}

export async function adminUpdateSpotAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "published");
  const fields = readSpotFields(formData);

  if (!id || Number.isNaN(fields.latitude) || Number.isNaN(fields.longitude)) {
    redirect(`${studioPath(key, `/spots/${id}`)}?error=missing-fields`);
  }

  const supabase = createAdminClient();
  const { error } = await supabase.rpc("admin_update_spot", {
    p_id: id,
    p_name: fields.name,
    p_description: fields.description,
    p_street_address: fields.streetAddress,
    p_city: fields.city,
    p_province: fields.province,
    p_region: fields.region,
    p_postal_code: fields.postalCode,
    p_country: fields.country,
    p_spot_type: fields.spotType,
    p_status: status === "hidden" ? "hidden" : "published",
    p_latitude: fields.latitude,
    p_longitude: fields.longitude,
  });

  if (error) {
    redirect(`${studioPath(key, `/spots/${id}`)}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/spots");
  redirect(studioPath(key, "/spots"));
}

export async function adminSetSpotStatusAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || (status !== "published" && status !== "hidden")) {
    redirect(studioPath(key, "/spots"));
  }

  const supabase = createAdminClient();
  await supabase.from("spots").update({ status }).eq("id", id);

  revalidatePath("/spots");
  redirect(studioPath(key, "/spots"));
}

export async function adminDeleteSpotAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const id = String(formData.get("id") ?? "");
  if (id) {
    const supabase = createAdminClient();
    await supabase.from("spots").delete().eq("id", id);
    revalidatePath("/spots");
  }
  redirect(studioPath(key, "/spots"));
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
export async function adminDeleteReviewAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const id = String(formData.get("id") ?? "");
  if (id) {
    const supabase = createAdminClient();
    await supabase.from("reviews").delete().eq("id", id);
    revalidatePath("/spots");
  }
  redirect(studioPath(key, "/reviews"));
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------
function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") === "published" ? "published" : "draft";
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const readingMinutes = Number(formData.get("readingMinutes"));

  return {
    title,
    slug: slugify(slugRaw || title),
    description: String(formData.get("description") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim() || "The Crusit Team",
    tags,
    reading_minutes: Number.isNaN(readingMinutes) || readingMinutes < 1 ? 3 : readingMinutes,
    status: status as "draft" | "published",
  };
}

export async function adminCreatePostAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const fields = readPostFields(formData);
  if (!fields.title || !fields.slug || !fields.body) {
    redirect(`${studioPath(key, "/articles/new")}?error=missing-fields`);
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").insert({
    ...fields,
    published_at: fields.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    redirect(`${studioPath(key, "/articles/new")}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/blog");
  redirect(studioPath(key, "/articles"));
}

export async function adminUpdatePostAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const id = String(formData.get("id") ?? "");
  const fields = readPostFields(formData);
  if (!id || !fields.title || !fields.slug || !fields.body) {
    redirect(`${studioPath(key, `/articles/${id}`)}?error=missing-fields`);
  }

  const supabase = createAdminClient();

  // Preserve the original publish date; set it the first time it goes live.
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("published_at")
    .eq("id", id)
    .maybeSingle();

  const existingPublishedAt = (existing?.published_at as string | null) ?? null;
  const published_at =
    fields.status === "published"
      ? existingPublishedAt ?? new Date().toISOString()
      : existingPublishedAt;

  const { error } = await supabase
    .from("blog_posts")
    .update({ ...fields, published_at })
    .eq("id", id);

  if (error) {
    redirect(`${studioPath(key, `/articles/${id}`)}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect(studioPath(key, "/articles"));
}

export async function adminDeletePostAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const id = String(formData.get("id") ?? "");
  if (id) {
    const supabase = createAdminClient();
    await supabase.from("blog_posts").delete().eq("id", id);
    revalidatePath("/blog");
  }
  redirect(studioPath(key, "/articles"));
}

// ---------------------------------------------------------------------------
// Site content (About, etc.)
// ---------------------------------------------------------------------------
export async function adminUpdateContentAction(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  await requireAdmin(key);

  const contentKey = String(formData.get("contentKey") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!contentKey) {
    redirect(studioPath(key, "/about"));
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key: contentKey, title, body }, { onConflict: "key" });

  if (error) {
    redirect(`${studioPath(key, "/about")}?error=${encodeURIComponent(error.message)}`);
  }

  if (contentKey === "about") revalidatePath("/about");
  redirect(`${studioPath(key, "/about")}?saved=1`);
}
