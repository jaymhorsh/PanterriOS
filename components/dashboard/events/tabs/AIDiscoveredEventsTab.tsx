import { Bot } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRetrieveEvents } from "@/hook/events";
import { EventListCard } from "./EventListCard";

export function AIDiscoveredEventsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data, isLoading } = useRetrieveEvents({
    page: currentPage,
    per_page: perPage,
  });

  const events = data?.data ?? [];
  const pagination = data?.meta?.pagination;
  const totalItems = pagination?.total_count ?? 0;
  const limit = pagination?.per_page ?? perPage;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] p-4">
        <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
          <Bot className="h-5 w-5 text-[#EA580C]" />
          AI-Discovered Events
        </h3>
        <p className="mt-1 text-sm text-[#64748B]">
          Events automatically discovered by AI crawlers
        </p>
      </div>

      <div className="space-y-3 p-4">
        {isLoading ? (
          <p className="text-sm text-[#64748B]">Loading events...</p>
        ) : null}
        {!isLoading && events.length === 0 ? (
          <p className="text-sm text-[#64748B]">
            No pending AI events available.
          </p>
        ) : (
          events.map((event) => <EventListCard key={event._id} event={event} />)
        )}
        {/* Pagination */}
        {totalItems > 0 ? (
          <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm text-[#6B7280]">
              Showing{" "}
              <span className="font-medium text-[#111827]">
                {(currentPage - 1) * limit + 1}-
                {Math.min(currentPage * limit, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-[#111827]">{totalItems}</span>{" "}
              events
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const distance = Math.abs(page - currentPage);
                  return (
                    distance === 0 ||
                    distance === 1 ||
                    page === 1 ||
                    page === totalPages
                  );
                })
                .map((page, index, array) => {
                  const showEllipsisBefore =
                    index > 0 && array[index - 1] !== page - 1;

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsisBefore ? (
                        <span className="px-2 text-gray-500">...</span>
                      ) : null}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
