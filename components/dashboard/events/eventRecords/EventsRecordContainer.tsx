'use client';

import {
  Bot,
  Calendar,
  ChevronLeft,
  Download,
  Search,
  Users,
  X,
} from 'lucide-react';
import { PageHead, TableSkeleton } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { ReUseAbleTable } from '@/components/shared';
import { eventRecordColumns } from './eventColumns';
import { useMemo, useState } from 'react';
import { debounce } from '@/utils/helpers';
import { ReusableSelect } from '@/components/ui/ReusableSelect';
import { Input } from '@/components/ui/input';
import { useRetrievePublishedRejectedEvents } from '@/hook/events/useRetrievePublishedRejectedEvents';
import { useRouter } from 'next/navigation';

export default function EventsRecordContainer() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [page, setPage] = useState(1);

  const { data: EventRecord, isLoading } = useRetrievePublishedRejectedEvents(
    debouncedSearchValue
      ? {
          search: debouncedSearchValue,
          page,
        }
      : {},
  );

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setDebouncedSearchValue(val), 600),
    [],
  );

  const StatCardData = [
    {
      id: 'total',
      label: 'Total Events',
      value: 50,
      icon: <Calendar className="h-6 w-6 text-[#90A1B9]" />,
    },
    {
      id: 'ai',
      label: 'AI Discovered',
      value: 48,
      icon: <Bot className="h-8 w-8 text-[#90A1B9]" />,
    },
    {
      id: 'submitted',
      label: 'Submitted',
      value: 2,
      icon: <Users className="h-6 w-6 text-[#90A1B9]" />,
    },
  ];

  return (
    <div className="w-full space-y-5 px-0">
      <div className="flex items-center gap-3 justify-between">
        <Button
          onClick={() => router.back()}
          className="gap-2 flex items-center"
        >
          <ChevronLeft /> Back
        </Button>
        <Button
          variant="outline"
          className="h-9 rounded-sm px-3 text-sm sm:h-10"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      <PageHead
        pageTitle="Events Record"
        subTitle="Complete database of all published events"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        {StatCardData.map((stat) => (
          <div
            key={stat.id}
            className="rounded-lg border  flex justify-between items-center border-[#E5E7EB] bg-white px-4 py-5"
          >
            <div>
              <p className="text-sm text-[#45556C]">{stat.label}</p>
              <p className="mt-1 text-3xl font-semibold text-[#111827]">
                {stat.value}
              </p>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rouned-xl  bg-white">
        <div className="overflow-hidden rouned-xl  bg-white">
          <div className="flex w-full flex-col py-4 gap-3 sm:flex-row justify-between lg:min-w-[420px] lg:items-end">
            <div className="flex w-full max-sm:flex-col gap-3 sm:justify-between">
              <div className="relative flex  w-fit bg-[#F3F4F6] rounded-sm border shadow-xs lg:max-w-lg">
                <Search className="text-gray-600 pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder={'Search....'}
                  value={searchValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchValue(val);
                    setPage(1);
                    debouncedSetSearch(val);
                  }}
                  className="h-9 w-full border-border  pl-10 pr-8 text-sm placeholder:text-[#636363] sm:min-w-[220px]"
                  aria-label="Search tasks"
                />

                {searchValue && (
                  <div
                    onClick={() => {
                      setSearchValue('');
                    }}
                    className="absolute top-1/2 right-2 flex -translate-y-1/2 bg-gray-900 p-1 rounded-full cursor-pointer"
                    aria-label="Clear search"
                    tabIndex={0}
                  >
                    <X className="text-white h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </div>

            {[
              {
                id: 'source',
                label: 'Source',
                value: filterSource,
                onChange: (val: string) => {
                  setFilterSource(val);
                  setPage(1);
                },
                options: [
                  { label: 'All Sources', value: 'all' },
                  { label: 'AI Discovered', value: 'ai' },
                  { label: 'Submitted', value: 'submitted' },
                ],
              },
              {
                id: 'type',
                label: 'Type',
                value: filterType,
                onChange: (val: string) => {
                  setFilterType(val);
                  setPage(1);
                },
                options: [
                  { label: 'All Types', value: 'all' },
                  { label: 'Physical', value: 'physical' },
                  { label: 'Hybrid', value: 'hybrid' },
                  { label: 'Virtual', value: 'virtual' },
                ],
              },
              {
                id: 'category',
                label: 'Category',
                value: filterCategory,
                onChange: (val: string) => {
                  setFilterCategory(val);
                  setPage(1);
                },
                options: [{ label: 'All Categories', value: 'all' }],
              },
            ].map((filter) => (
              <div key={filter.id} className="w-full lg:w-[180px]">
                <ReusableSelect
                  value={filter.value}
                  onChange={filter.onChange}
                  placeholder={filter.label}
                  items={filter.options}
                />
              </div>
            ))}
          </div>
          {isLoading ? (
            <TableSkeleton rows={6} columns={6} />
          ) : EventRecord ? (
            <ReUseAbleTable
              data={EventRecord.data}
              columns={eventRecordColumns}
              entityName="events"
              pagination={{
                currentPage: page,
                totalItems: EventRecord?.meta?.pagination?.total_count ?? 0,
                totalPages: Math.max(
                  1,
                  Math.ceil(
                    (EventRecord?.meta?.pagination?.total_count ?? 0) /
                      (EventRecord?.meta?.pagination?.per_page ?? 10),
                  ),
                ),
                limit: EventRecord?.meta?.pagination?.per_page ?? 10,
                onPageChange: setPage,
              }}
            />
          ) : (
            <div> No data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
