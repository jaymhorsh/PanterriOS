import { DashboardTopProjectItem } from '@/interface';

export default function TopProjects({
  projects,
}: {
  projects: DashboardTopProjectItem[];
}) {
  return (
    <div className="rounded-lg border border-[#E9EDF5] bg-white p-5  lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold  text-[#18233A] ">Top Projects</h3>
          <p className=" text-[#6B7A99] ">By funding</p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {projects.map((project, i) => (
          <article key={i} className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="font-semibold text-lg tracking-[-0.03em] text-[#18233A]">
                  {project.projectName}
                </h4>
                <p className=" text-[#6B7A99]">{project.fundedLabel}</p>
              </div>

              <div className="shrink-0 text-sm rounded-[8px] bg-[#E8EEF7] px-4 py-2 font-medium text-[#101828]">
                {project.roiLabel}
              </div>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-[#EEF3FA]">
              <div
                className="h-full rounded-full bg-[#08C74F]"
                style={{ width: `${project.roi}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
