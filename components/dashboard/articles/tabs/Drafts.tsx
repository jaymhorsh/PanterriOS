import { PencilLine } from "lucide-react";

interface ArticlesTabProps {
  category: string;
}

const drafts = [
  {
    title: "Editorial draft: content trends for Q2",
    category: "business",
    status: "Draft",
    updatedAt: "2 hours ago",
  },
  {
    title: "Social media publishing checklist",
    category: "technology",
    status: "Draft",
    updatedAt: "Today",
  },
  {
    title: "Weekly finance digest outline",
    category: "finance",
    status: "Draft",
    updatedAt: "Yesterday",
  },
];

export function Drafts({ category }: ArticlesTabProps) {
  const filteredDrafts =
    category === "all"
      ? drafts
      : drafts.filter((draft) => draft.category === category);

  return (
    <div className="space-y-4">
      {filteredDrafts.length > 0 ? (
        filteredDrafts.map((draft) => (
          <div
            key={draft.title}
            className="flex items-start justify-between rounded-xl border border-[#E5E7EB] bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EBD9FA] text-[#8B23E8]">
                <PencilLine className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-medium text-gray-900">
                  {draft.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {draft.updatedAt} • {draft.category}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#F3ECFF] px-3 py-1 text-xs font-medium text-[#8B23E8]">
              {draft.status}
            </span>
          </div>
        ))
      ) : (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] p-8 text-center text-sm text-gray-500">
          No drafts found for this category.
        </div>
      )}
    </div>
  );
}
