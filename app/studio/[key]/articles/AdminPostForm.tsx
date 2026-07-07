import type { AdminPost } from "@/lib/admin/data";

type AdminPostFormProps = {
  keyParam: string;
  action: (formData: FormData) => void | Promise<void>;
  post?: AdminPost;
  submitLabel: string;
  error?: string;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white";

export default function AdminPostForm({
  keyParam,
  action,
  post,
  submitLabel,
  error,
}: AdminPostFormProps) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <input type="hidden" name="key" value={keyParam} />
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      {error ? (
        <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <label className="block text-sm text-zinc-300">
        Title
        <input name="title" required defaultValue={post?.title ?? ""} className={inputClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          Slug <span className="text-zinc-500">(URL, auto from title if blank)</span>
          <input name="slug" defaultValue={post?.slug ?? ""} className={inputClass} />
        </label>
        <label className="block text-sm text-zinc-300">
          Status
          <select name="status" defaultValue={post?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <label className="block text-sm text-zinc-300">
        Meta description <span className="text-zinc-500">(SEO, ~155 chars)</span>
        <textarea
          name="description"
          rows={2}
          defaultValue={post?.description ?? ""}
          className={inputClass}
        />
      </label>

      <label className="block text-sm text-zinc-300">
        Excerpt <span className="text-zinc-500">(shown in listings)</span>
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className={inputClass} />
      </label>

      <label className="block text-sm text-zinc-300">
        Body
        <textarea
          name="body"
          required
          rows={16}
          defaultValue={post?.body ?? ""}
          placeholder={"Write the article here.\n\nUse '## Heading' for sections, '- item' for bullets, and a blank line between paragraphs."}
          className={`${inputClass} font-mono text-sm`}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm text-zinc-300">
          Author
          <input
            name="author"
            defaultValue={post?.author ?? "The Crusit Team"}
            className={inputClass}
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Tags <span className="text-zinc-500">(comma-separated)</span>
          <input name="tags" defaultValue={post?.tags.join(", ") ?? ""} className={inputClass} />
        </label>
        <label className="block text-sm text-zinc-300">
          Reading minutes
          <input
            name="readingMinutes"
            type="number"
            min={1}
            defaultValue={post?.readingMinutes ?? 3}
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
