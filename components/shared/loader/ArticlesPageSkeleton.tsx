import { StatCardSkeleton } from './StatCardSkeleton';
import { TableSkeleton } from './TableSkeleton';

export function ArticlesPageSkeleton() {
  return (
    <div className="w-full space-y-6 px-0 animate-pulse">
      <div className="flex flex-col gap-4 rounded-2xl border border-transparent bg-transparent sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>

        <div className="h-10 w-36 rounded-md bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        <StatCardSkeleton count={4} />
      </div>

      <div className="space-y-6 rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`articles-tab-skeleton-${index}`}
                className="h-12 w-40 rounded-md bg-gray-200"
              />
            ))}
          </div>

          <div className="h-10 w-full rounded-md bg-gray-200 lg:w-[240px]" />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="h-6 w-52 rounded bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-200" />
          </div>

          <TableSkeleton rows={6} columns={7} />
        </div>
      </div>
    </div>
  );
}
