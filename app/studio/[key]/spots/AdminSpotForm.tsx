import { SPOT_TYPES, DEFAULT_SPOT_TYPE } from "@/lib/spotTypes";
import type { Spot } from "@/lib/types";

type AdminSpotFormProps = {
  keyParam: string;
  action: (formData: FormData) => void | Promise<void>;
  spot?: Spot;
  submitLabel: string;
  error?: string;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white";

export default function AdminSpotForm({
  keyParam,
  action,
  spot,
  submitLabel,
  error,
}: AdminSpotFormProps) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <input type="hidden" name="key" value={keyParam} />
      {spot ? <input type="hidden" name="id" value={spot.id} /> : null}

      {error ? (
        <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <label className="block text-sm text-zinc-300">
        Name
        <input name="name" required defaultValue={spot?.name ?? ""} className={inputClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          Type
          <select
            name="spotType"
            defaultValue={spot?.spot_type ?? DEFAULT_SPOT_TYPE}
            className={inputClass}
          >
            {SPOT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-zinc-300">
          Status
          <select name="status" defaultValue={spot?.status ?? "published"} className={inputClass}>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </select>
        </label>
      </div>

      <label className="block text-sm text-zinc-300">
        Description
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={spot?.description ?? ""}
          className={inputClass}
        />
      </label>

      <label className="block text-sm text-zinc-300">
        Street address <span className="text-zinc-500">(optional)</span>
        <input name="streetAddress" defaultValue={spot?.street_address ?? ""} className={inputClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          City
          <input name="city" required defaultValue={spot?.city ?? ""} className={inputClass} />
        </label>
        <label className="block text-sm text-zinc-300">
          Country
          <input name="country" required defaultValue={spot?.country ?? ""} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm text-zinc-300">
          Province
          <input name="province" defaultValue={spot?.province ?? ""} className={inputClass} />
        </label>
        <label className="block text-sm text-zinc-300">
          Region
          <input name="region" defaultValue={spot?.region ?? ""} className={inputClass} />
        </label>
        <label className="block text-sm text-zinc-300">
          Postal code
          <input name="postalCode" defaultValue={spot?.postal_code ?? ""} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          Latitude
          <input
            name="latitude"
            type="number"
            step="any"
            required
            defaultValue={spot?.latitude ?? ""}
            className={inputClass}
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Longitude
          <input
            name="longitude"
            type="number"
            step="any"
            required
            defaultValue={spot?.longitude ?? ""}
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
      >
        {submitLabel}
      </button>
    </form>
  );
}
