export default function AdminError({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-amber-900/50 bg-amber-950/30 p-4 text-sm text-amber-200">
      <p className="font-medium">Could not load this section.</p>
      <p className="mt-1 break-words text-amber-300/80">{message}</p>
      <p className="mt-2 text-amber-300/80">
        Make sure you ran the latest <code>supabase/admin.sql</code> in Supabase and
        that <code>SUPABASE_SERVICE_ROLE_KEY</code> is set in your environment.
      </p>
    </div>
  );
}
