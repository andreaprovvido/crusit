"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildSpotSlug } from "@/lib/slug";
import { DEFAULT_SPOT_TYPE, isSpotType } from "@/lib/spotTypes";
import { createClient } from "@/lib/supabase/server";

function parseRating(value: FormDataEntryValue | null) {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null;
  }
  return rating;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/spots");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  redirect(redirectTo);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/spots");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  redirect(redirectTo);
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/spots");
}

export async function createSpotAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/spots/new");
  }

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const streetAddress = String(formData.get("streetAddress") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const province = String(formData.get("province") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const postalCode = String(formData.get("postalCode") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const spotTypeRaw = String(formData.get("spotType") ?? "").trim();
  const spotType = isSpotType(spotTypeRaw) ? spotTypeRaw : DEFAULT_SPOT_TYPE;
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));

  if (
    !name ||
    !description ||
    !city ||
    !country ||
    Number.isNaN(latitude) ||
    Number.isNaN(longitude)
  ) {
    redirect("/spots/new?error=missing-fields");
  }

  const slug = buildSpotSlug(name, crypto.randomUUID().slice(0, 8));

  const { data, error } = await supabase.rpc("create_spot", {
    p_slug: slug,
    p_name: name,
    p_description: description,
    p_street_address: streetAddress,
    p_city: city,
    p_province: province,
    p_region: region,
    p_postal_code: postalCode,
    p_country: country,
    p_spot_type: spotType,
    p_latitude: latitude,
    p_longitude: longitude,
  });

  if (error || !data) {
    redirect(`/spots/new?error=${encodeURIComponent(error?.message ?? "create-failed")}`);
  }

  const created = Array.isArray(data) ? data[0] : data;

  revalidatePath("/spots");
  redirect(`/spots/${created.slug}`);
}

export async function upsertReviewAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const spotSlug = String(formData.get("spotSlug") ?? "");
  const spotId = String(formData.get("spotId") ?? "");
  const rating = parseRating(formData.get("rating"));
  const body = String(formData.get("body") ?? "").trim();
  const reviewId = String(formData.get("reviewId") ?? "");

  if (!user) {
    redirect(`/login?redirectTo=/spots/${spotSlug}`);
  }

  if (!spotId || !spotSlug || !rating || body.length < 10) {
    redirect(`/spots/${spotSlug}?error=invalid-review`);
  }

  if (reviewId) {
    const { error } = await supabase
      .from("reviews")
      .update({ rating, body })
      .eq("id", reviewId)
      .eq("user_id", user.id);

    if (error) {
      redirect(`/spots/${spotSlug}?error=${encodeURIComponent(error.message)}`);
    }
  } else {
    const { error } = await supabase.from("reviews").insert({
      spot_id: spotId,
      user_id: user.id,
      rating,
      body,
    });

    if (error) {
      redirect(`/spots/${spotSlug}?error=${encodeURIComponent(error.message)}`);
    }
  }

  revalidatePath(`/spots/${spotSlug}`);
  revalidatePath("/spots");
  redirect(`/spots/${spotSlug}`);
}
