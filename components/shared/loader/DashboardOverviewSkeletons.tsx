export function DashboardStatCardsSkeleton() {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`dashboard-stat-skeleton-${index}`}
          className="rounded-lg border border-[#E9EDF5] bg-white p-4 animate-pulse"
        >
          <div className="space-y-4">
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="flex items-end justify-between pt-4">
              <div className="h-12 w-24 rounded bg-gray-200" />
              <div className="h-16 w-16 rounded-full bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardMiniCardsSkeleton() {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`dashboard-mini-card-skeleton-${index}`}
          className="rounded-lg border border-[#E9EDF5] bg-white p-4 space-y-8 animate-pulse"
        >
          <div className="flex justify-between">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-5 w-5 rounded bg-gray-200" />
          </div>
          <div className="h-8 w-24 rounded bg-gray-200" />
          <div className="flex justify-between">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-10 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardPanelSkeleton({
  rows = 4,
  showChart = false,
}: {
  rows?: number;
  showChart?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[#E9EDF5] bg-white p-5 lg:p-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-6 w-40 rounded bg-gray-200" />
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>

      {showChart ? (
        <div className="mt-8 space-y-6">
          <div className="h-[320px] w-full rounded-2xl bg-gray-100" />
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`dashboard-chart-legend-skeleton-${index}`}
                className="flex items-center gap-3"
              >
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-3 w-12 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={`dashboard-panel-row-skeleton-${index}`}
              className="rounded-lg bg-[#F7F9FC] p-5"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-4 w-48 rounded bg-gray-200" />
                </div>
                <div className="space-y-3 lg:min-w-[160px]">
                  <div className="h-5 w-24 rounded bg-gray-200 lg:ml-auto" />
                  <div className="h-8 w-28 rounded bg-gray-200 lg:ml-auto" />
                  <div className="h-4 w-24 rounded bg-gray-200 lg:ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PortfolioDistributionSkeleton() {
  return (
    <div className="rounded-lg border border-[#E9EDF5] bg-white p-5 lg:p-8 animate-pulse">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="h-4 w-36 rounded bg-gray-200" />
        </div>
        <div className="h-14 w-40 rounded-lg bg-gray-200" />
      </div>

      <div className="relative mx-auto mt-6 h-[360px] max-w-[560px]">
        <div className="absolute inset-0 rounded-full bg-gray-100" />
        <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`portfolio-distribution-skeleton-${index}`}
            className="flex items-center gap-4"
          >
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-3 w-12 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
