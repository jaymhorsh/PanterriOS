"use client";

import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConfirmationDialog } from "@/components/shared";
import { DraftInvestmentItem } from "@/interface";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, Edit, Eye, MapPin, Trash2 } from "lucide-react";
import { InvestmentDetailsView } from "./details/investmentDetailsView";
import { cn } from "@/lib/utils";
import { useDeleteInvestment } from "@/hook/investment-management";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DraftInvestmentsProps {
  data: DraftInvestmentItem[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

const formatPropertyType = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const formatDraftId = (value: number) =>
  `D-${value.toString().padStart(3, "0")}`;

export function DraftInvestments({
  data,
  pagination,
  currentPage,
  onPageChange,
}: DraftInvestmentsProps) {
  const router = useRouter();
  const { mutate: deleteInvestment, isPending: isDeleting } =
    useDeleteInvestment();
  const [selectedInvestment, setSelectedInvestment] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (!selectedInvestment) return;

    deleteInvestment(selectedInvestment.id, {
      onSuccess: () => {
        setIsDialogOpen(false);
        window.dispatchEvent(
          new CustomEvent("investment-deleted", {
            detail: { id: selectedInvestment.id },
          }),
        );
        setSelectedInvestment(null);
      },
    });
  };

  const columns: ColumnDef<DraftInvestmentItem>[] = [
    {
      accessorKey: "id",
      header: () => (
        <span className="block max-w-[90px] truncate text-xs sm:text-sm">
          draft id
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
          <Clock className="h-4 w-4 flex-shrink-0 text-orange-400" />
          <span className="break-all">{formatDraftId(row.original.id)}</span>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <span className="block max-w-[140px] truncate text-xs sm:text-sm">
          investment name
        </span>
      ),
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#0F172A] sm:text-sm whitespace-normal break-words">
            {row.original.name}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: () => (
        <span className="block max-w-[100px] truncate text-xs sm:text-sm">
          location
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex items-start gap-2 text-xs text-[#62748E] sm:text-sm">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="whitespace-normal break-words">
            {row.original.location.city}, {row.original.location.state}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "propertyType",
      header: () => <span className="block truncate text-xs sm:text-sm">type</span>,
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-2 rounded-sm border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 sm:px-3 sm:text-sm">
          {formatPropertyType(row.original.propertyType)}
        </span>
      ),
    },
    {
      accessorKey: "targetedAmount",
      header: () => (
        <span className="block max-w-[120px] truncate text-xs sm:text-sm">
          target amount
        </span>
      ),
      cell: ({ row }) => (
        <div className="text-xs font-semibold break-all sm:text-sm">
          {formatCurrency(row.original.targetedAmount)}
        </div>
      ),
    },
    {
      accessorKey: "completionPercentage",
      header: () => (
        <span className="block max-w-[100px] truncate text-xs sm:text-sm">
          completion
        </span>
      ),
      cell: ({ row }) => {
        const value = row.original.completionPercentage;

        return (
          <div className="flex min-w-28 items-center gap-2 sm:min-w-32 sm:gap-3">
            <Progress
              value={value}
              className={cn(
                "h-2 rounded-sm bg-gray-200",
                "[&>div]:bg-orange-500 [&>div]:transition-colors duration-300",
              )}
            />
            <span className="text-xs font-medium text-orange-600 sm:text-sm">
              {value}%
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "lastEdited",
      header: () => (
        <span className="block max-w-[100px] truncate text-xs sm:text-sm">
          last edited
        </span>
      ),
      cell: ({ row }) => (
        <div className="text-xs text-[#62748E] sm:text-sm whitespace-normal break-words">
          {row.original.lastEdited}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => (
        <span className="block text-xs sm:text-sm truncate">actions</span>
      ),
      cell: ({ row }) => {
        const rowId = row.original.id;

        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <InvestmentDetailsView id={rowId}>
              <Button
                variant="outline"
                className="h-9 w-9 p-0 sm:h-10 sm:w-10"
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </InvestmentDetailsView>

            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 cursor-pointer p-0 sm:h-10 sm:w-10"
              onClick={() =>
                router.push(
                  `/investments/${rowId}?edit&propertyName=${encodeURIComponent(
                    row.original.name,
                  )}`,
                )
              }
            >
              <Edit className="inline h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 cursor-pointer p-0 sm:h-10 sm:w-10"
              onClick={() => {
                setSelectedInvestment({
                  id: rowId,
                  name: row.original.name,
                });
                setIsDialogOpen(true);
              }}
            >
              <Trash2 className="inline h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <ReUseAbleTable
        data={data}
        columns={columns}
        entityName="Drafts"
        pagination={{
          currentPage,
          totalPages: pagination?.totalPages || 1,
          totalItems: pagination?.totalItems || data.length,
          limit: pagination?.limit || 20,
          onPageChange,
        }}
      />

      <ConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Delete investment"
        description={
          selectedInvestment
            ? `Are you sure you want to delete ${selectedInvestment.name}? This action cannot be undone.`
            : "Are you sure you want to delete this investment?"
        }
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedInvestment(null)}
        isLoading={isDeleting}
        variant="delete"
      />
    </div>
  );
}
