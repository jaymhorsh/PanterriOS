'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages?: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  entityName?: string;
  className?: string;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (page) => {
      const distance = Math.abs(page - currentPage);

      return (
        distance === 0 || distance === 1 || page === 1 || page === totalPages
      );
    },
  );
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  entityName = 'results',
  className = '',
}: PaginationControlsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const calculatedTotalPages = totalPages
    ? totalPages
    : Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const visiblePages = getVisiblePages(currentPage, calculatedTotalPages);
  if (totalItems <= 0 || calculatedTotalPages <= 0) {
    return null;
  }
  return (
    <div
      className={`flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 lg:flex-row lg:items-center lg:justify-between ${className}`.trim()}
    >
      <div className="text-sm text-[#6B7280]">
        Showing{' '}
        <span className="font-medium text-[#111827]">
          {startItem}-{endItem}
        </span>{' '}
        of <span className="font-medium text-[#111827]">{totalItems}</span>{' '}
        {entityName}
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {visiblePages.map((page, index) => {
          const showEllipsisBefore =
            index > 0 && visiblePages[index - 1] !== page - 1;

          return (
            <div key={page} className="flex items-center gap-1">
              {showEllipsisBefore ? (
                <span className="px-2 text-gray-500">...</span>
              ) : null}
              <Button
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
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
            onPageChange(Math.min(calculatedTotalPages, currentPage + 1))
          }
          disabled={currentPage === calculatedTotalPages}
          className="h-9 w-9 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
