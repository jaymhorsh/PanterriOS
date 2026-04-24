"use client";

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
import { Inbox } from "lucide-react";
import { PaginationControls } from "@/components/shared/PaginationControls";

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
  // eslint-disable-next-line react-hooks/incompatible-library
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
                    className="h-14 whitespace-nowrap px-4 py-3 font-medium uppercase text-[#62748E] sm:px-4"
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
                      className="px-4 text-sm font-normal  capitalize whitespace-normal break-words [overflow-wrap:anywhere] sm:px-4"
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
        {hasData && (
          <div className="px-4 py-4 sm:px-6">
            {pagination ? (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                onPageChange={pagination.onPageChange}
                entityName={entityName}
                className="border-t-0 pt-0"
              />
            ) : (
              <PaginationControls
                currentPage={table.getState().pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                totalItems={table.getFilteredRowModel().rows.length}
                itemsPerPage={table.getState().pagination.pageSize}
                onPageChange={(page) => table.setPageIndex(page - 1)}
                entityName={entityName}
                className="border-t-0 pt-0"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
