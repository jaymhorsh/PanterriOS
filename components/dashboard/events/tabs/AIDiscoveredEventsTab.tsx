import { useState } from 'react';
import { Bot } from 'lucide-react';
import { useRetrieveEvents } from '@/hook/events';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { EventListCard } from './EventListCard';

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
  const totalPages = pagination?.total_count;

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
        <PaginationControls
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={setCurrentPage}
          entityName="ai-events"
        />
      </div>
    </div>
  );
}
