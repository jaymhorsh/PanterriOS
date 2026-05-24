export function AreaChartSkeleton() {
  return (
    <div className="w-full rounded-3xl border border-[#E6E9ED] bg-white p-6 animate-pulse">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="h-7 w-52 rounded-md bg-gray-100" />
        <div className="h-4 w-72 rounded-md bg-gray-100" />
      </div>

      

      {/* Chart */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[#FAFAFA] p-4">
        {/* Y axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between px-4 py-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-px w-full bg-gray-100"
            />
          ))}
        </div>

        {/* Fake chart wave */}
        <svg
          viewBox="0 0 800 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0,240
              C80,210 120,170 180,160
              C240,150 280,190 340,180
              C400,170 450,90 520,130
              C580,170 620,240 700,200
              C740,180 770,120 800,100
              L800,300
              L0,300
              Z
            "
            className="fill-gray-100"
          />
        </svg>
      </div>
    </div>
  );
}