import { ColumnDef } from "@tanstack/react-table";
import {
  getTransactionTypeConfig,
  normalizeTransactionType,
} from "@/utils/transactionTypeColors";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SlideInPanelDrawer } from "@/components/shared";
import { Eye } from "lucide-react";
import { TransactionAudit } from "./TransactionAudit";
import { WalletFinanceTransaction } from "@/interface";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
}

export const transactionColumns: ColumnDef<WalletFinanceTransaction>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <span className="font-medium text-base text-gray-900">
        {row.original.reference}
      </span>
    ),
  },
  {
    accessorKey: "investorName",
    header: "Investor",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.investorName}</span>
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
    header: "Amount",
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
      <span className="text-gray-600">{row.original.dateTime}</span>
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
    header: "action",
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
          <TransactionAudit transactionId={transaction.id} />
        </SlideInPanelDrawer>
      );
    },
  },
];
