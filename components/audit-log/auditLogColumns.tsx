import type { ColumnDef } from "@tanstack/react-table";
import type { AuditLogRecord } from "@/interface";
import { AuditLogDetailsDrawer } from "./AuditLogDetailsDrawer";
import { normalizeIdentifierLabel } from "@/utils/helpers";

export function ActionBadge({ action }: { action?: string }) {
  const normalized = (action ?? "-").toLowerCase();

  const toneMap: Record<string, string> = {
    admin_login: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
    update_investment: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
    approve: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
    reject: "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]",
    create: "border-[#C7D2FE] bg-[#EEF2FF] text-[#3730A3]",
  };

  return (
    <span
      className={`inline-flex rounded-sm border px-2 py-0.5 text-xs font-medium capitalize ${toneMap[normalized] ?? "border-[#E5E7EB] bg-white text-[#475569]"}`}
    >
      {normalizeIdentifierLabel(normalized)}
    </span>
  );
}
function getInitials(name?: string) {
  if (!name) return "-";
  const parts = name.split(" ");
  const initials = parts.map((part) => part[0]).join("");
  return initials.toUpperCase();
}
export const auditLogColumns: ColumnDef<AuditLogRecord>[] = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-[#111827]">
        {row.original.actor.userId}
      </span>
    ),
  },
  {
    accessorKey: "reference",
    header: "Log ID",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-[#111827]">
        {row.original.reference}
      </span>
    ),
  },
  {
    accessorKey: "occurredAt",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.original.occurredAt;
      const date = new Date(timestamp);

      if (Number.isNaN(date.getTime())) {
        return <span className="text-sm text-[#45556C]">{timestamp}</span>;
      }

      return (
        <div className="text-sm text-[#45556C]">
          <p>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "actor",
    header: "Administrator",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="bg-[#F1F5F9] text=[#314158]  0 h-9 w-9 rounded-md flex justify-center items-center">
          <span className="text-sm">
            {" "}
            {getInitials(row.original.actor?.name)}
          </span>
        </div>
        <div className="text-sm text-[#111827]">
          <p className="font-semibold text-[#0F172B]">
            {row.original.actor?.name ?? "-"}
          </p>
          <p className="text-xs text-[#62748E]">
            {row.original.actor?.roles?.[0] ?? "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="space-y-1">
        <ActionBadge action={row.original.action} />
        <p className="text-xs text-[#64748B]">{row.original.description}</p>
      </div>
    ),
  },
  {
    accessorKey: "module",
    header: "Department",
    cell: ({ row }) => (
      <span className="text-sm text-[#111827]">{row.original.module}</span>
    ),
  },
  // {
  //   accessorKey: "location",
  //   header: "Location",
  //   cell: () => <span className="text-sm text-[#45556C]">-</span>,
  // },
  {
    id: "options",
    header: "Options",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <AuditLogDetailsDrawer row={row.original} />
      </div>
    ),
  },
];
