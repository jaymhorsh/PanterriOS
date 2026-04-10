import { ColumnDef } from "@tanstack/react-table";
import { YieldDisbursementLedgerInvestor } from "@/interface";
import { StatusBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

export const yieldDetailsColumns: ColumnDef<YieldDisbursementLedgerInvestor>[] = [
  {
    accessorKey: "disbursementCode",
    header: "Yield ID",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-slate-700">
        {row.original.disbursementCode}
      </span>
    ),
  },
  {
    accessorKey: "investorName",
    header: "Investor Name",
    cell: ({ row }) => (
      <span className="text-sm text-slate-700">{row.original.investorName}</span>
    ),
  },
  {
    accessorKey: "amountInvested",
    header: "Amount Invested",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-slate-900">
        {formatCurrency(row.original.amountInvested)}
      </span>
    ),
  },
  {
    accessorKey: "payoutAmount",
    header: "Yield Amount",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-slate-900">
        {formatCurrency(row.original.payoutAmount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-slate-500 hover:text-slate-700"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];
