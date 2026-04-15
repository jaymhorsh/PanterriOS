"use client";
import { useMemo, useState } from "react";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { TableFilters } from "@/components/shared/TableFilters";
import { TableSkeleton } from "@/components/shared/loader";
import { Check } from "lucide-react";
import { type InvestorWalletStatusFilter } from "@/interface";
import { useRetrieveInvestorWallets } from "@/hook/wallet-finance";
import { investorsWalletColumns } from "./investorsWalletColumns";
import { debounce } from "@/utils/helpers";

export function InvestorsWallet() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setDebouncedSearchValue(val), 600),
    [],
  );

  const status =
    filterStatus === "all"
      ? undefined
      : (filterStatus as InvestorWalletStatusFilter);

  const { data, isLoading } = useRetrieveInvestorWallets({
    page,
    limit: 20,
    status: status,
    search: debouncedSearchValue || undefined,
  });
  const walletsData = data?.data?.data;

  return (
    <div className="w-full space-y-6">
      <TableFilters
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value);
          setPage(1);
          debouncedSetSearch(value);
        }}
        searchPlaceholder="Search by investor, code, or email..."
        title="Investor Vaults"
        subtitle="Manage investor balances and wallet controls"
        filters={[
          {
            id: "status",
            label: "All Status",
            value: filterStatus,
            onChange: (value) => {
              setFilterStatus(value);
              setPage(1);
            },
            icon: <Check className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Suspended", value: "suspended" },
              { label: "Closed", value: "closed" },
            ],
          },
        ]}
      />

      {isLoading ? (
        <TableSkeleton rows={6} columns={6} />
      ) : (
        <ReUseAbleTable
          data={walletsData?.data ?? []}
          columns={investorsWalletColumns}
          entityName="investor Vaults"
          pagination={
            walletsData?.pagination
              ? {
                  currentPage: walletsData.pagination.currentPage,
                  totalPages: walletsData.pagination.totalPages,
                  totalItems: walletsData.pagination.totalItems,
                  limit: walletsData.pagination.limit,
                  onPageChange: setPage,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
