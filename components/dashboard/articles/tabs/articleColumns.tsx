import { ColumnDef } from "@tanstack/react-table";
import { Eye, FileText, Trash2 } from "lucide-react";
import { ArticleRecord } from "../data";

function BadgePill({ label, tone = "default" }: { label: string; tone?: "default" | "blue" | "purple" | "amber" }) {
  const toneClasses = {
    default: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
    blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
    purple: "border-[#E9D5FF] bg-[#F3E8FF] text-[#8B5CF6]",
    amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  };

  return (
    <span className={`inline-flex rounded-md border px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}

export const publishedArticleColumns: ColumnDef<ArticleRecord>[] = [
  {
    accessorKey: "title",
    header: "Article",
    cell: ({ row }) => (
      <div className="flex items-start gap-3">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${row.original.coverClassName}`}
        >
          <FileText className="h-7 w-7 text-white/95" />
        </div>
        <div className="min-w-0">
          <p className="max-w-[360px] truncate text-base font-semibold text-gray-900">
            {row.original.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {row.original.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#F1F5F9] px-3 py-1 text-sm font-medium text-[#64748B]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <span className="text-base text-gray-900">{row.original.author}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <BadgePill label={row.original.category} tone="blue" />
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const tone = row.original.source === "Crawled" ? "amber" : "purple";
      return <BadgePill label={row.original.source} tone={tone} />;
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Published",
    cell: ({ row }) => (
      <span className="text-base text-gray-900">{row.original.publishedAt}</span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-base font-medium text-gray-900">
        {row.original.views.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "badges",
    header: "Badges",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.badges.length > 0 ? (
          row.original.badges.map((badge) => (
            <BadgePill key={badge} label={badge} />
          ))
        ) : (
          <span className="text-sm text-gray-400">None</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="flex items-center justify-end gap-3 text-gray-500">
        <button type="button" className="transition hover:text-gray-900" aria-label="View article">
          <Eye className="h-5 w-5" />
        </button>
        <button type="button" className="transition hover:text-red-600" aria-label="Delete article">
          <Trash2 className="h-5 w-5 text-red-600" />
        </button>
      </div>
    ),
  },
];
