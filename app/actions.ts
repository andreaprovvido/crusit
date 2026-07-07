"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildSpotSlug } from "@/lib/slug";
import { DEFAULT_SPOT_TYPE, isSpotType } from "@/lib/spotTypes";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidUsername, normalizeUsername, USERNAME_RULE } from "@/lib/username";

function loginError(message: string, redirectTo: string) {
  redirect(
    `/login?error=${encodeURIComponent(message)}&redirectTo=${encodeURIComponent(redirectTo)}`,
  );
}

function parseRating(value: FormDataEntryValue | null) {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null;
  }
  return rating;
}

export async function signInAction(formData: FormData) {
  const identifier = String(formData.get("identifier") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/spots");

  if (!identifier || !password) {
    loginError("Enter your email/username and password.", redirectTo);
  }

  // Resolve the email when the user signs in with a username.
  let email = identifier;
  if (!identifier.includes("@")) {
    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .ilike("username", identifier)
      .maybeSingle();

    if (!profile) {
      loginError("Invalid credentials.", redirectTo);
    }

    const { data: userRes, error: lookupError } = await admin.auth.admin.getUserById(
      profile!.id,
    );
    if (lookupError || !userRes?.user?.email) {
      loginError("Invalid credentials.", redirectTo);
    }
    email = userRes!.user!.email!;
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    loginError(error.message, redirectTo);
  }

  redirect(redirectTo);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const username = normalizeUsername(String(formData.get("username") ?? ""));
  const redirectTo = String(formData.get("redirectTo") ?? "/spots");

  if (!isValidUsername(username)) {
    loginError(`Invalid username. ${USERNAME_RULE}`, redirectTo);
  }

  const admin = createAdminClient();

  // Pre-check availability (the unique index is the real guard against races).
  const { data: taken } = await admin
    .from("profiles")
    .select("id")
    .ilike("username", username)
    .maybeSingle();
  if (taken) {
    loginError("That username is already taken.", redirectTo);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    loginError(error.message, redirectTo);
  }

  const userId = data.user?.id;
  if (userId) {
    const { error: profileError } = await admin
      .from("profiles")
      .insert({ id: userId, username });

    if (profileError) {
      // Most likely a race on the unique username: roll back the auth user.
      await admin.auth.admin.deleteUser(userId).catch(() => {});
      loginError("That username is already taken.", redirectTo);
    }
  }

  redirect(redirectTo);
}

export async function updateUsernameAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/profile");

  const username = normalizeUsername(String(formData.get("username") ?? ""));
  if (!isValidUsername(username)) {
    redirect(`/profile?error=${encodeURIComponent(`Invalid username. ${USERNAME_RULE}`)}`);
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .ilike("username", username)
    .neq("id", user.id)
    .maybeSingle();
  if (existing) {
    redirect(`/profile?error=${encodeURIComponent("That username is already taken.")}`);
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, username }, { onConflict: "id" });
  if (error) {
    redirect(`/profile?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/profile");
  redirect("/profile?saved=username");
}

export async function changePasswordAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect("/login?redirectTo=/profile");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (newPassword.length < 6) {
    redirect(`/profile?error=${encodeURIComponent("New password must be at least 6 characters.")}`);
  }

  // Verify the current password by re-authenticating.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });
  if (verifyError) {
    redirect(`/profile?error=${encodeURIComponent("Your current password is incorrect.")}`);
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    redirect(`/profile?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/profile?saved=password");
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

export async function toggleReviewLikeAction(formData: FormData) {
  const spotSlug = String(formData.get("spotSlug") ?? "");
  const reviewId = String(formData.get("reviewId") ?? "");
  const sort = String(formData.get("sort") ?? "recent");
  const page = String(formData.get("page") ?? "1");

  const query = new URLSearchParams();
  if (sort && sort !== "recent") query.set("sort", sort);
  if (page && page !== "1") query.set("page", page);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  const spotUrl = `/spots/${spotSlug}${suffix}`;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(spotUrl)}`);
  }

  if (!spotSlug || !reviewId) {
    redirect(spotUrl);
  }

  const { data: existing } = await supabase
    .from("review_likes")
    .select("review_id")
    .eq("review_id", reviewId)
    .eq("user_id", user!.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("review_likes")
      .delete()
      .eq("review_id", reviewId)
      .eq("user_id", user!.id);
  } else {
    await supabase
      .from("review_likes")
      .insert({ review_id: reviewId, user_id: user!.id });
  }

  revalidatePath(`/spots/${spotSlug}`);
  redirect(spotUrl);
}
