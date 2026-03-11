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
      header: "draft id",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-semibold">
          <Clock className="text-orange-400 w-4 h-4" />
          {formatDraftId(row.original.id)}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "investment name",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium text-sm text-[#0F172A]">
            {row.original.name}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "location",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-[#62748E]">
          <MapPin className="h-4 w-4" />
          <span>
            {row.original.location.city}, {row.original.location.state}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "propertyType",
      header: "type",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-xs font-medium border-blue-200 bg-blue-50 text-blue-600">
          {formatPropertyType(row.original.propertyType)}
        </span>
      ),
    },
    {
      accessorKey: "targetedAmount",
      header: "target amount",
      cell: ({ row }) => (
        <div className="font-semibold">
          {formatCurrency(row.original.targetedAmount)}
        </div>
      ),
    },
    {
      accessorKey: "completionPercentage",
      header: "completion",
      cell: ({ row }) => {
        const value = row.original.completionPercentage;

        return (
          <div className="flex items-center gap-3 min-w-32">
            <Progress
              value={value}
              className={cn(
                "h-2 rounded-sm bg-gray-200",
                "[&>div]:bg-orange-500 [&>div]:transition-colors duration-300",
              )}
            />
            <span className="font-medium text-orange-600">{value}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "lastEdited",
      header: "last edited",
      cell: ({ row }) => (
        <div className="text-[#62748E]">{row.original.lastEdited}</div>
      ),
    },
    {
      accessorKey: "action",
      header: "actions",
      cell: ({ row }) => {
        const rowId = row.original.id;

        return (
          <div className="flex items-center justify-center gap-2">
            <InvestmentDetailsView id={rowId}>
              <Button variant="outline">
                <Eye className="w-5 h-5" />
              </Button>
            </InvestmentDetailsView>

            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() =>
                router.push(
                  `/investments/${rowId}?edit&propertyName=${encodeURIComponent(
                    row.original.name,
                  )}`,
                )
              }
            >
              <Edit className="w-5 h-5 inline" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setSelectedInvestment({
                  id: rowId,
                  name: row.original.name,
                });
                setIsDialogOpen(true);
              }}
            >
              <Trash2 className="w-5 h-5 text-red-500 inline" />
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
