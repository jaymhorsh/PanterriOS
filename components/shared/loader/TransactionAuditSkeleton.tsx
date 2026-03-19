export function TransactionAuditSkeleton() {
  return (
    <div className="flex h-full flex-col animate-pulse">
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        <div className="rounded-lg border border-border bg-gray-100 p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-10 w-48 rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-12 rounded bg-gray-200" />
              <div className="h-7 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 w-44 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`transaction-audit-detail-skeleton-${index}`}
                className="rounded-lg border border-border bg-gray-100 p-4"
              >
                <div className="mb-2 h-4 w-32 rounded bg-gray-200" />
                <div className="h-5 w-48 rounded bg-gray-200" />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`transaction-audit-datetime-skeleton-${index}`}
                  className="rounded-lg border bg-gray-100 p-4"
                >
                  <div className="mb-2 h-4 w-16 rounded bg-gray-200" />
                  <div className="h-5 w-28 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 w-24 rounded bg-gray-200" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`transaction-audit-event-skeleton-${index}`}
                className="flex items-start gap-3"
              >
                <div className="mt-1 h-5 w-5 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-48 rounded bg-gray-200" />
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 border-t bg-white p-6">
        <div className="h-11 flex-1 rounded-md bg-gray-200" />
        <div className="h-11 flex-1 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
