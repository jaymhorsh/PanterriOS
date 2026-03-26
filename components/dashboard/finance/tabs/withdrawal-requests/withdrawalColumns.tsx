import { ColumnDef } from "@tanstack/react-table";
import { WithdrawalRequestItem } from "@/interface";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/utils/helpers";
import { WithdrawalActionButtons } from "./WithdrawalActionButtons";

const getRiskColor = (riskProfileLabel: string) => {
  const colors: Record<string, string> = {
    "Low Risk": "bg-transparent text-sm text-primary-green",
    "Medium Risk": "bg-transparent text-sm text-[#155DFC]",
    "High Risk": "bg-transparent text-sm text-[#FE9A00]",
  };
  return colors[riskProfileLabel] || "bg-gray-50 text-gray-700 border-gray-200";
};

export const withdrawalColumns: ColumnDef<WithdrawalRequestItem>[] = [
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
        <p className="text-xs text-gray-400">{row.original.createdAt}</p>
      </div>
    ),
  },
  {
    accessorKey: "bankName",
    header: "BANK",
    cell: ({ row }) => (
      <div>
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
        {formatCurrency(row.original.amount)}
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
      return <StatusBadge status={status} showDot />;
    },
  },
  {
    accessorKey: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <WithdrawalActionButtons row={row.original} />,
  },
];
