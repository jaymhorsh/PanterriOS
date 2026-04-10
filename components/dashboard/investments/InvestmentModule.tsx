"use client";
import { PageHead, StatCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import {
  AllInvestments,
  DraftInvestments,
} from "@/components/dashboard/investments";
import { Badge } from "@/components/ui/badge";
import {
  useRetrieveDraftInvestments,
  useRetrieveInvestments,
} from "@/hook/investment-management";
import { debounce } from "@/utils/helpers";
import { StatCardSkeleton, TableSkeleton } from "@/components/shared/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function InvestmentModule() {
  const [tab, setTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [allPage, setAllPage] = useState(1);
  const [draftPage, setDraftPage] = useState(1);
  const [stateFilter, setStateFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  // Debounce search input
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setAllPage(1);
        setDraftPage(1);
      }, 500),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSetSearch(value);
  };

  const { data, isLoading, isError } = useRetrieveInvestments({
    search: debouncedSearch || undefined,
    page: allPage,
    limit: 20,
    state: stateFilter,
    investmentStatus: statusFilter,
    propertyType: typeFilter,
  });

  const {
    data: draftData,
    isLoading: isDraftLoading,
    isError: isDraftError,
  } = useRetrieveDraftInvestments({
    search: debouncedSearch || undefined,
    page: draftPage,
    limit: 20,
    state: stateFilter,
    investmentStatus: statusFilter,
    propertyType: typeFilter,
  });

  const allInvestmentsContent = (() => {
    if (isLoading) {
      return <TableSkeleton />;
    }

    if (isError) {
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Unable to load investments right now. Please try again.
        </div>
      );
    }

    return (
      <AllInvestments
        data={data?.data?.data || []}
        pagination={data?.data?.pagination}
        currentPage={allPage}
        onPageChange={setAllPage}
      />
    );
  })();

  const draftInvestmentsContent = (() => {
    if (isDraftLoading) {
      return <TableSkeleton />;
    }

    if (isDraftError) {
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Unable to load draft investments right now. Please try again.
        </div>
      );
    }

    return (
      <DraftInvestments
        data={draftData?.data?.data || []}
        pagination={draftData?.data?.pagination}
        currentPage={draftPage}
        onPageChange={setDraftPage}
      />
    );
  })();

  const tabs = [
    {
      title: `All investments`,
      value: "all",
      count: data?.data?.pagination?.totalItems || 0,
      content: allInvestmentsContent,
    },
    {
      title: `Draft `,
      value: "draft",
      count: draftData?.data?.pagination?.totalItems || 0,
      content: draftInvestmentsContent,
    },
  ];
  const metrics = [
    {
      label: "Total Investments",
      value: data?.data?.stats?.totalInvestments ?? 0,
      scope: data?.data?.stats?.statusBreakdown
        ? `${data?.data?.stats.statusBreakdown.active} active, ${data.data?.stats.statusBreakdown.pending} pending`
        : "N/A",
    },
    {
      label: "Total Raised",
      currency: "NGN",
      value: `₦${((data?.data?.stats?.totalRaised ?? 0) / 1000000).toFixed(1)}M`,
      scope: "Across all properties",
    },
    {
      label: "Avg Returns",
      unit: "percent",
      value: `${data?.data?.stats?.averageReturn ?? 0}%`,
      scope: "Across all properties",
    },
    {
      label: "Total Investors",
      value: data?.data?.stats?.totalInvestors ?? 0,
      scope: "Unique participants",
    },
  ];
  const filterSelection = [
    {
      value: "propertyType",
      label: "All Types",
      filterState: typeFilter,
      setFilter: setTypeFilter,
      options: [
        { value: "all", label: "All Types" },
        { value: "commercial", label: "Commercial" },
        { value: "industrial_space", label: "Industrial Space" },
        { value: "land", label: "Land" },
        { value: "office_block", label: "Office Block" },
        { value: "retail_mall", label: "Retail Mall" },
        { value: "residential", label: "Residential" },
        { value: "student_housing", label: "Student Housing" },
      ],
    },
    {
      value: "status",
      label: "All Status",
      filterState: statusFilter,
      setFilter: setStatusFilter,
      options: [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "upcoming", label: "Upcoming" },
        { value: "active", label: "Active" },
        { value: "funded", label: "Funded" },
        { value: "closed", label: "Closed" },
      ],
    },
    {
      value: "location",
      label: "Location",
      filterState: stateFilter,
      setFilter: setStateFilter,
      options: [
        { value: "all", label: "All Locations" },
        { value: "lagos", label: "Lagos" },
        { value: "abuja", label: "Abuja" },
        { value: "port Harcourt", label: "Port Harcourt" },
      ],
    },
  ];

  return (
    <div>
      <PageHead
        pageTitle="Investment Management"
        subTitle="Create and manage investment opportunities"
      >
        <Link href={"/investments/create-investment"}>
          <Button className="flex items-center gap-2 rounded-sm text-xs sm:text-sm h-9 sm:h-10 px-3">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Investment</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </Link>
      </PageHead>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-wrap gap-3 sm:gap-4 lg:gap-6 my-6 sm:my-8">
        {isLoading ? (
          <>
            <StatCardSkeleton />
          </>
        ) : (
          metrics.map((stat, i) => (
            <StatCard
              label={stat.label}
              description={stat.scope}
              value={stat.value}
              color={"text-green-700"}
              key={i}
            />
          ))
        )}
      </div>
      <Tabs value={tab} onValueChange={setTab} className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-4 sm:flex-col lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="flex flex-wrap w-fit">
            {tabs.map((tab, i) => (
              <TabsTrigger
                value={tab.value}
                key={i}
                className="flex items-center gap-2 text-xs sm:text-sm"
              >
                {tab.title}{" "}
                <Badge
                  className={`text-xs rounded-sm ${tab.value === "all" ? "text-blue-500 bg-blue-100" : "text-orange-500 bg-orange-100"}`}
                >
                  {tab.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-row lg:items-center lg:justify-end">
            <div className="flex items-center gap-2 border bg-gray-100 px-3 rounded-sm w-full lg:w-auto">
              <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="border-0 w-full lg:w-40 bg-gray-100 placeholder:text-gray-600 h-9 text-xs sm:text-sm"
                aria-label="Search investments"
              />
            </div>
            <div className="flex max-sm:flex-wrap gap-2 w-full lg:w-auto">
              {filterSelection.map((filter, i) => {
                return (
                  <Select
                    key={i}
                    value={filter.filterState || "all"}
                    onValueChange={(value) => {
                      filter.setFilter(value === "all" ? undefined : value);
                      setAllPage(1);
                      setDraftPage(1);
                    }}
                  >
                    <SelectTrigger className="h-9 text-xs sm:text-sm flex-1 sm:flex-initial min-w-[110px] sm:min-w-[130px]">
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent align="start" position="popper">
                      {filter.options.map((option) => (
                        <SelectItem
                          value={option.value}
                          key={option.value}
                          className="text-xs sm:text-sm"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              })}
            </div>
          </div>
        </div>
        {tabs.map((tab, i) => (
          <TabsContent value={tab.value} key={i} className="mt-4">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
