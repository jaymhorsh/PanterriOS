"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

interface TableProp<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  entityName?: string;
  pagination?: PaginationConfig;
}
export function ReUseAbleTable<TData extends object>({
  data,
  columns,
  entityName = "results",
  pagination,
}: TableProp<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const hasData = data?.length > 0;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-[#E2E2E2] bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-[#F9FAFB]">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-14 whitespace-nowrap px-4 py-3 font-medium uppercase text-[#62748E] sm:px-6"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {hasData ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b min-h-20  border-[#E2E2E2] hover:bg-[#F9FAFB]/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 text-sm font-normal whitespace-normal break-words [overflow-wrap:anywhere] sm:px-6"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center py-12">
                    <Inbox className="h-12 w-12 text-[#9CA3AF] mb-4" />
                    <h3 className="text-lg font-semibold text-[#111827] mb-2">
                      No data available
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      There are no records to display at the moment.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
        {/* Pagination */}
        {hasData && (
          <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            {pagination ? (
              <>
                <div className="text-sm text-[#6B7280]">
                  Showing{" "}
                  <span className="font-medium text-[#111827]">
                    {(pagination.currentPage - 1) * pagination.limit + 1}-
                    {Math.min(
                      pagination.currentPage * pagination.limit,
                      pagination.totalItems,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#111827]">
                    {pagination.totalItems}
                  </span>{" "}
                  {entityName}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      pagination.onPageChange(
                        Math.max(1, pagination.currentPage - 1),
                      )
                    }
                    disabled={pagination.currentPage === 1}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  )
                    .filter((page) => {
                      const distance = Math.abs(page - pagination.currentPage);
                      return (
                        distance === 0 ||
                        distance === 1 ||
                        page === 1 ||
                        page === pagination.totalPages
                      );
                    })
                    .map((page, index, array) => {
                      const showEllipsisBefore =
                        index > 0 && array[index - 1] !== page - 1;

                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsisBefore && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                          <Button
                            variant={
                              pagination.currentPage === page
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => pagination.onPageChange(page)}
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
                      pagination.onPageChange(
                        Math.min(
                          pagination.totalPages,
                          pagination.currentPage + 1,
                        ),
                      )
                    }
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-[#6B7280]">
                  Showing{" "}
                  <span className="font-medium text-[#111827]">
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}
                    -
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#111827]">
                    {table.getFilteredRowModel().rows.length}
                  </span>{" "}
                  {entityName}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from(
                    { length: table.getPageCount() },
                    (_, i) => i,
                  ).map((pageIndex) => (
                    <Button
                      key={pageIndex}
                      variant={
                        table.getState().pagination.pageIndex === pageIndex
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => table.setPageIndex(pageIndex)}
                      className={`h-9 w-9 p-0 ${
                        table.getState().pagination.pageIndex === pageIndex
                          ? "bg-primary-blue text-white hover:bg-primary-blue/90"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {pageIndex + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
