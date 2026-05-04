import { StatCardSkeleton } from "./StatCardSkeleton";

export function AIAgentsPageSkeleton() {
  return (
    <div className="w-full space-y-6 px-0 animate-pulse">
      <div className="flex flex-col gap-4 rounded-2xl border border-transparent bg-transparent sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>
        <div className="h-10 w-36 rounded-md bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4 sm:gap-3">
        <StatCardSkeleton count={4} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="h-[280px] rounded-2xl border border-[#E5E7EB] bg-white" />
        <div className="h-[280px] rounded-2xl border border-[#E5E7EB] bg-white" />
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <div className="border-b border-[#E5E7EB] px-2 py-4">
          <div className="h-6 w-40 rounded bg-gray-200" />
        </div>

        <div className="space-y-4 p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`ai-activity-skeleton-${index}`}
              className="flex items-start gap-4 rounded-lg bg-gray-100 px-5 py-4"
            >
              <div className="mt-2 h-3 w-3 rounded-full bg-gray-300" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
