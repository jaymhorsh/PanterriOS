import { ColumnDef } from "@tanstack/react-table";
import { YieldDisbursementLedgerInvestor } from "@/interface";
import { SlideInPanelDrawer, StatusBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

export const yieldDetailsColumns: ColumnDef<YieldDisbursementLedgerInvestor>[] =
  [
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
        <span className="text-sm text-slate-700">
          {row.original.investorName}
        </span>
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
        <SlideInPanelDrawer
          trigger={
            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          }
          title="Yield Control Center"
          subtitle="Manage Yield Disbursement Details"
          width="md"
          contentClassName={"mx-0"}
        >
          <div className="flex flex-col gap-4">
            Coming Soon...........
          </div>
        </SlideInPanelDrawer>
      ),
    },
  ];
