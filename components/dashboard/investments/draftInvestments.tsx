"use client";

import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DraftInvestmentItem } from "@/interface";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, Eye, MapPin } from "lucide-react";
import { InvestmentDetailsView } from "./details/investmentDetailsView";
import { cn } from "@/lib/utils";

interface DraftInvestmentsProps {
  data: DraftInvestmentItem[];
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

const formatDraftId = (value: number) => `D-${value.toString().padStart(3, "0")}`;


export function DraftInvestments({ data }: DraftInvestmentsProps) {
  const columns: ColumnDef<DraftInvestmentItem>[] = [
    {
      accessorKey: "id",
      header: "draft id",
      cell: ({ row }) => <div className="flex items-center gap-2 font-semibold">
        <Clock className='text-orange-400'/>
        {formatDraftId(row.original.id)}
        </div>,
    },
    {
      accessorKey: "name",
      header: "investment name",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-semibold text-base text-[#0F172A]">{row.original.name}</p>
          <span className="inline-flex items-center rounded-sm border border-orange-300 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600">
            Draft
          </span>
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
        <span className="inline-flex items-center rounded-sm border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          {formatPropertyType(row.original.propertyType)}
        </span>
      ),
    },
    {
      accessorKey: "targetedAmount",
      header: "target amount",
      cell: ({ row }) => <div className="font-semibold">{formatCurrency(row.original.targetedAmount)}</div>,
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
      cell: ({ row }) => <div className="text-[#62748E]">{row.original.lastEdited}</div>,
    },
    {
      accessorKey: "action",
      header: "actions",
      cell: ({ row }) => (
        <InvestmentDetailsView id={row.original.id}>
          <Button variant="outline">
            <Eye className="w-5 h-5" />
          </Button>
        </InvestmentDetailsView>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <ReUseAbleTable data={data} columns={columns} entityName="drafts" />
    </div>
  );
}
