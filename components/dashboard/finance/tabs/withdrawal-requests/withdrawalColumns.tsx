import { ColumnDef } from "@tanstack/react-table";
import { WithdrawalApprovalItem } from "@/interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

import { formatDate } from "@/utils/helpers";

const getRiskColor = (riskProfileLabel: string) => {
  const colors: Record<string, string> = {
    "Low Risk": "bg-transparent text-sm text-primary-green",
    "Medium Risk": "bg-transparent text-sm text-[#155DFC]",
    "High Risk": "bg-transparent text-sm text-[#FE9A00]",
  };
  return colors[riskProfileLabel] || "bg-gray-50 text-gray-700 border-gray-200";
};

export const withdrawalColumns: ColumnDef<WithdrawalApprovalItem>[] = [
  {
    accessorKey: "requestId",
    header: "REQUEST ID",
    cell: ({ row }) => (
      <p className="font-medium text-gray-900">{row.original.requestId}</p>
    ),
  },
  {
    accessorKey: "investorName",
    header: "INVESTOR",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{row.original.investorName}</p>
        <p className="text-xs text-gray-400">
          {formatDate(row.original.createdAt)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "bankName",
    header: "BANK",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{row.getValue("bankName")}</p>
        <p className="text-sm text-gray-600 font-medium">
          {row.original.bankName}
        </p>
        <p className="text-xs text-gray-400">{row.original.accountNumber}</p>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {row.original.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "NGN",
        })}
      </span>
    ),
  },
  {
    accessorKey: "riskProfileLabel",
    header: "AML RISK",
    cell: ({ row }) => {
      const risk = row.original.riskProfileLabel;
      return <Badge className={getRiskColor(risk)}>{risk}</Badge>;
    },
  },
  {
    accessorKey: "statusLabel",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.original.statusLabel;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "actions",
    header: "ACTIONS",
    cell: ({ row }) => {
      const handleApprove = () => {
        console.log("Approve:", row.original.requestId);
        // TODO: Implement approval logic
      };

      const handleReject = () => {
        console.log("Reject:", row.original.requestId);
        // TODO: Implement rejection logic
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleApprove}
            className="bg-green-600 rounded-sm font-normal hover:bg-green-700 text-white disabled:opacity-50"
          >
            <CircleCheckBig className="h-4 w-4 mr-0.5" /> Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleReject}
            className="rounded-sm font-normal"
          >
            <CircleX className="h-4 w-4 mr-0.5" />
            Reject
          </Button>
        </div>
      );
    },
  },
];
