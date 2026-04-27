"use client";

import { Activity, Check, Layers3, Shield, User2 } from "lucide-react";
import {
  PageHead,
  ReUseAbleTable,
  StatCard,
  TableFilters2,
  TableSkeleton,
} from "@/components/shared";
import { auditLogColumns } from "./auditLogColumns";
import { useRetrieveAuditLogs } from "@/hook/audit-log";
import { useMemo, useState } from "react";
import { debounce } from "@/utils/helpers";

export function AuditLogsContainer() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [filterEntityType, setFilterEntityType] = useState("all");
  const [filterCritical, setFilterCritical] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setDebouncedSearch(val), 600),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    debouncedSetSearch(value);
  };
  const actorUserId = debouncedSearch.trim()
    ? Number(debouncedSearch)
    : undefined;

  const { data, isLoading } = useRetrieveAuditLogs({
    page,
    limit: 10,
    actorUserId,
    module: filterModule === "all" ? undefined : filterModule,
    action: filterAction === "all" ? undefined : filterAction,
    entityType: filterEntityType === "all" ? undefined : filterEntityType,
    critical:
      filterCritical === "all"
        ? undefined
        : filterCritical === "true"
          ? true
          : false,
  });

  const rows = data?.data?.data ?? [];
  const paginationData = data?.data?.pagination;
  const stats = data?.data?.stats;

  return (
    <div className="w-full space-y-6 px-0">
      <PageHead
        pageTitle="Audit Logs"
        subTitle="Monitor and review all administrative activities across the platform."
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        <StatCard
          label="Total Activity"
          value={(stats?.totalActivity ?? 0).toLocaleString()}
          description="Last 24h"
          Icon={Activity}
          iconColor="text-[#155DFC]"
          bgColor="bg-[#DBEAFE]"
        />
        <StatCard
          label="Critical Events"
          value={stats?.criticalEvents ?? 0}
          description="Last 24h"
          Icon={Shield}
          iconColor="text-[#C2410C]"
          bgColor="bg-[#FFEDD5]"
        />
        <StatCard
          label="Admin Logins"
          value={stats?.adminLogins ?? 0}
          description="Last 24h"
          Icon={User2}
          iconColor="text-[#1D4ED8]"
          bgColor="bg-[#DBEAFE]"
        />
        {/* <StatCard
          label="Active Regions"
          value={0}
          description="Lagos and Abuja"
          Icon={Layers3}
          iconColor="text-[#1D4ED8]"
          bgColor="bg-[#DBEAFE]"
        /> */}
        <StatCard
          label="Modules Count"
          value={stats?.modulesCount ?? 0}
          description="Distinct modules"
          Icon={Layers3}
          iconColor="text-[#1D4ED8]"
          bgColor="bg-[#DBEAFE]"
        />
      </div>
      <TableFilters2
        searchValue={search}
        search
        searchPlaceholder="Search by User ID"
        onSearchChange={handleSearchChange}
        filters={[
          {
            id: "module",
            label: "All Modules",
            value: filterModule,
            onChange: (value) => {
              setFilterModule(value);
              setPage(1);
            },
            icon: <Layers3 className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Modules", value: "all" },
              { label: "Investments", value: "investments" },
              { label: "Auth", value: "auth" },
              { label: "Wallet", value: "wallet" },
              { label: "Finance", value: "finance" },
            ],
          },
          {
            id: "action",
            label: "All Actions",
            value: filterAction,
            onChange: (value) => {
              setFilterAction(value);
              setPage(1);
            },
            icon: <Activity className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Actions", value: "all" },
              { label: "Create", value: "create" },
              { label: "Update", value: "update" },
              { label: "Delete", value: "delete" },
              { label: "Login", value: "login" },
              { label: "Approve", value: "approve" },
              { label: "Reject", value: "reject" },
            ],
          },
          {
            id: "entityType",
            label: "All Entity Types",
            value: filterEntityType,
            onChange: (value) => {
              setFilterEntityType(value);
              setPage(1);
            },
            icon: <User2 className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Entity Types", value: "all" },
              { label: "User", value: "user" },
              { label: "Transaction", value: "transaction" },
              { label: "Wallet", value: "wallet" },
              { label: "Vault", value: "vault" },
              { label: "Admin", value: "admin" },
            ],
          },
          {
            id: "critical",
            label: "All Severity",
            value: filterCritical,
            onChange: (value) => {
              setFilterCritical(value);
              setPage(1);
            },
            icon: <Check className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Severity", value: "all" },
              { label: "Critical", value: "true" },
              { label: "Non-Critical", value: "false" },
            ],
          },
        ]}
      />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <ReUseAbleTable
          columns={auditLogColumns}
          data={rows}
          entityName="Records"
          pagination={
            paginationData
              ? {
                  currentPage: paginationData.currentPage,
                  totalPages: paginationData.totalPages,
                  totalItems: paginationData.totalItems,
                  limit: paginationData.limit,
                  onPageChange: (newPage: number) => setPage(newPage),
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

// Proximity
// Hierachy tellig tu the viaul shoould be direct and mot be visaully dominant tellig the user
//  what to read first ,second, third
// repeating leement ot create unty
