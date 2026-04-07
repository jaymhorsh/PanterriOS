import { ColumnDef } from "@tanstack/react-table";
import {
  getTransactionTypeConfig,
  normalizeTransactionType,
} from "@/utils/transactionTypeColors";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  SlideInPanelDrawer,
  TransactionAuditSkeleton,
} from "@/components/shared";
import { Eye } from "lucide-react";
import { WalletFinanceTransaction, YieldDisbursementItem } from "@/interface";
import { formatCurrency } from "@/utils/helpers";

export const yieldColumns: ColumnDef<YieldDisbursementItem>[] = [
  {
    accessorKey: "reference",
    header: "Event ID",
    cell: ({ row }) => {
      const ref = row.original.reference;
      const displayRef = ref.length > 25 ? ref.substring(0, 25) + "..." : ref;
      return (
        <span
          className="font-medium text-base text-gray-900 cursor-pointer"
          title={ref}
        >
          {displayRef}
        </span>
      );
    },
  },
  {
    accessorKey: "propertyName",
    header: "Property Name",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.propertyName}</span>
    ),
  },
  {
    accessorKey: "yieldRate",
    header: "Yield Rate",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.yieldRate}%</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const config = getTransactionTypeConfig(normalizeTransactionType(type));
      const IconComponent = config.icon as React.ComponentType<{
        className: string;
      }>;
      return (
        <div className="flex items-center gap-2">
          <IconComponent className={cn("h-4 w-4", config.color)} />
          <span className="text-gray-700">{config.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Total Payout",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.disbursedDate}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <SlideInPanelDrawer
          trigger={
            <Eye className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          }
          title="Transaction Audit"
          subtitle={transaction.reference}
          width="md"
        >
          <TransactionAuditSkeleton />
        </SlideInPanelDrawer>
      );
    },
  },
];
