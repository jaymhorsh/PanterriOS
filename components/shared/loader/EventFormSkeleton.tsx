export function EventFormSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-5">
      <div className="space-y-3 border-b border-slate-200 pb-4">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-slate-200" />
          <div className="h-4 w-56 rounded bg-slate-200" />
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`event-step-skeleton-${index}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-3"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-md bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 rounded bg-slate-200" />
                  <div className="h-4 w-24 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="space-y-4 p-6">
            <div className="h-6 w-40 rounded bg-slate-200" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`event-field-skeleton-${index}`} className="space-y-2">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-10 w-full rounded bg-slate-200" />
              </div>
            ))}
            <div className="space-y-2">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-32 w-full rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="h-10 w-24 rounded bg-slate-200" />
        <div className="h-10 w-32 rounded bg-slate-200" />
      </div>
    </div>
  );
}
