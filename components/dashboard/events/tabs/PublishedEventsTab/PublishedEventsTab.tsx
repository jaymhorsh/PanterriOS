import Image from 'next/image';
import {
  Search,
  Filter,
  MapPin,
  CalendarDays,
  ExternalLink,
} from 'lucide-react';
import { EventPublishedListCard } from './EventPublishedListCard';
import { EventEntity, Pagination } from '@/interface';

import { PaginationControls } from '@/components/shared/PaginationControls';

interface EventsTabContentProps {
  events: EventEntity[];
  search: string;
  pagination: Pagination;
  onSearchChange: (value: string) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export function EventsTabContent({
  events,
  search,
  onSearchChange,
  pagination,
  currentPage,
  setCurrentPage,
}: EventsTabContentProps) {
  const featuredEvents = events.filter((event) => event.isFeatured);

  const perPage = 10;

  const totalItems = pagination?.total_count ?? 0;
  const limit = pagination?.per_page ?? perPage;
  return (
    <div className="space-y-6">
      {featuredEvents && (
        <div>
          <h3 className="text-2xl font-semibold text-[#A21CAF]">
            Featured Events
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {featuredEvents.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-md border border-[#111827] bg-black text-white"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={event.imageUrl!}
                    alt={event.title}
                    fill
                    className="object-cover bg-white"
                  />
                </div>
                <div className="space-y-2 relative p-3">
                  <h4 className="line-clamp-2 h-9 text-[#EDEDED] text-sm font-semibold">
                    {event.title}
                  </h4>
                  <p className="text-sm pt-1 text-[#888888]">Feb 15-16</p>
                  <div className="flex w-full justify-between items-center">
                    <p className="inline-flex items-center gap-1 text-sm text-[#4A5565]">
                      <MapPin className="h-3.5 w-3.5 text-[#4A5565]" /> Eko
                      Hotels, Lagos
                    </p>
                    <ExternalLink className="h-5 w-5 cursor-pointer text-[#444444] bottom-2 right-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search events..."
            className="h-10 w-full rounded-md border border-[#E5E7EB] bg-white pl-9 pr-3 text-sm text-[#111827] outline-none ring-0 placeholder:text-[#9CA3AF]"
          />
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#374151]"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#111827]">
          All Events (upcoming)
        </h3>
        <p className="mt-1 inline-flex items-center gap-2 text-sm text-[#6B7280]">
          <CalendarDays className="h-4 w-4" />
          {events.length} matching records
        </p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <EventPublishedListCard key={event._id} event={event} />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={limit}
        onPageChange={setCurrentPage}
        entityName="published-events"
      />
    </div>
  );
}
