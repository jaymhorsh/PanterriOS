import { Bot } from "lucide-react";

interface ArticlesTabProps {
  category: string;
}

const queueItems = [
  {
    title: "New crawled story from tech feed",
    category: "technology",
    status: "Awaiting review",
    source: "AI discovered",
  },
  {
    title: "Market trends summary draft",
    category: "finance",
    status: "Awaiting review",
    source: "AI discovered",
  },
  {
    title: "Business leadership article crawl",
    category: "business",
    status: "Awaiting review",
    source: "External source",
  },
];

export function CrawledQueue({ category }: ArticlesTabProps) {
  const filteredItems =
    category === "all"
      ? queueItems
      : queueItems.filter((item) => item.category === category);

  return (
    <div className="space-y-4">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div
            key={item.title}
            className="flex items-start justify-between rounded-xl border border-[#E5E7EB] bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D6F1E1] text-[#0AA84F]">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item.source} • {item.category}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#EAF9EF] px-3 py-1 text-xs font-medium text-[#0AA84F]">
              {item.status}
            </span>
          </div>
        ))
      ) : (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] p-8 text-center text-sm text-gray-500">
          No crawled articles found for this category.
        </div>
      )}
    </div>
  );
}
