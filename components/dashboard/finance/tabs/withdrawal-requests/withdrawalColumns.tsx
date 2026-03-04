import { ColumnDef } from "@tanstack/react-table";
import { WithdrawalRequest } from "./withdrawalData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

const getRiskColor = (risk: string) => {
  const colors: Record<string, string> = {
    "Low Risk": "bg-transparent text-sm text-primary-green ",
    "Medium Risk": "bg-transparent text-sm text-[#155DFC]",
    "High Risk": "bg-transparent text-sm text-[#FE9A00] ",
  };
  return colors[risk] || "bg-gray-50 text-gray-700 border-gray-200";
};

export const withdrawalColumns: ColumnDef<WithdrawalRequest>[] = [
  {
    accessorKey: "requestId",
    header: "REQUEST ID",
    cell: ({ row }) => (
      <p className="font-medium text-gray-900">
        {row.getValue("requestId")}
      </p>
    ),
  },
  {
    accessorKey: "investor",
    header: "INVESTOR",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{row.getValue("investor")}</p>
        <p className="text-sm text-gray-600">{row.original.investorDate}</p>
      </div>
    ),
  },
  {
    accessorKey: "bank",
    header: "BANK",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{row.getValue("bank")}</p>
        <p className="text-sm text-gray-600">{row.original.bankAccount}</p>
      </div>
    ),
  },
  {
    accessorKey: "formattedAmount",
    header: "AMOUNT",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {row.getValue("formattedAmount")}
      </span>
    ),
  },
  {
    accessorKey: "amlRisk",
    header: "AML RISK",
    cell: ({ row }) => {
      const risk = row.getValue("amlRisk") as string;
      return <Badge className={getRiskColor(risk)}>{risk}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
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
            // disabled={status === 'Approved' || status === 'Rejected'}
            className="bg-green-600 rounded-sm font-normal hover:bg-green-700 text-white"
          >
            <CircleCheckBig className="h-4 w-4 mr-0.5" /> Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleReject}
            className="rounded-sm font-normal"
            // disabled={status === 'Approved' || status === 'Rejected'}
          >
            <CircleX className="h-4 w-4 mr-0.5" />
            Reject
          </Button>
        </div>
      );
    },
  },
];
