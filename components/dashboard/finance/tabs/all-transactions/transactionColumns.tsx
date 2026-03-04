import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../../types";
import { getTransactionTypeConfig } from "@/utils/transactionTypeColors";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SlideInPanelDrawer } from "@/components/shared";
import { Eye } from "lucide-react";
import { TransactionAudit } from "./TransactionAudit";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <span className="font-medium text-base text-gray-900">
        {row.getValue("reference")}
      </span>
    ),
  },
  {
    accessorKey: "investor",
    header: "Investor",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.getValue("investor")}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const config = getTransactionTypeConfig(type as unknown as Parameters<typeof getTransactionTypeConfig>[0]);
      const IconComponent = config.icon as React.ComponentType<{ className: string }>;
      return (
        <div className="flex items-center gap-2">
          <IconComponent className={cn("h-4 w-4", config.color)} />
          <span className="text-gray-700">{config.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "formattedAmount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {row.getValue("formattedAmount")}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      const time = row.original.time;
      return (
        <span className="text-gray-600">
          {date} {time}
        </span>
      );
    },
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
          <TransactionAudit transaction={transaction} />
        </SlideInPanelDrawer>
      );
    },
  },
];
