"use client";
import { DetailsView } from "@/components/dashboard/investors";
import { PageHead, StatCard, StatusBadge } from "@/components/shared";
import { SlideInPanelDrawer } from "@/components/shared/SlideInPanel";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { TableFilters } from "@/components/shared/TableFilters";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Banknote,
  Calendar,
  List,
  User,
  Share,
  TriangleAlert,
  Users,
  Wallet,
  Eye,
  // EllipsisVertical removed - unused
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
interface InvestorsDataTableProp {
  id: string;
  name: string;
  email: string;
  kyc_status: string;
  tier: string;
  total_invested: {
    currency: string;
    value: number;
    formatted: string;
  };
  portfolio_value: {
    currency: string;
    value: number;
    formatted: string;
  };
  account_status: string;
}

export default function Investorspage() {
  // Filter states
  const [searchValue, setSearchValue] = useState("");
  const [kycFilter, setKycFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const metrics = [
    {
      label: "Total Investors",
      value: 6,
      description: "All registered users",
      icon: Users,
    },
    {
      label: "Pending KYC",
      value: 1,
      description: "Requires review",
      icon: TriangleAlert,
      color: "text-orange-500",
    },
    {
      label: "Total Invested",
      // currency: 'NGN',
      // value: 190000000,
      value: "₦190M",
      description: "Across all investors",
      icon: Banknote,
    },
    {
      label: "Avg Portfolio",
      // currency: 'NGN',
      // value: 3000000,
      value: "₦3M",
      description: "Per investor",
      icon: Wallet,
      iconColor: "text-[#00A63E]",
    },
  ];

  const investors = [
    {
      id: "000001",
      name: "John Doe",
      email: "john.doe@example.com",
      kyc_status: "Approved",
      tier: "Platinum",
      total_invested: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.00M",
      },
      portfolio_value: {
        currency: "NGN",
        value: 20000000,
        formatted: "₦20.00M",
      },
      account_status: "active",
    },
    {
      id: "000001",
      name: "John Doe",
      email: "john.doe@example.com",
      kyc_status: "Approved",
      tier: "Platinum",
      total_invested: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.00M",
      },
      portfolio_value: {
        currency: "NGN",
        value: 20000000,
        formatted: "₦20.00M",
      },
      account_status: "active",
    },
    {
      id: "000001",
      name: "John Doe",
      email: "john.doe@example.com",
      kyc_status: "Approved",
      tier: "Platinum",
      total_invested: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.00M",
      },
      portfolio_value: {
        currency: "NGN",
        value: 20000000,
        formatted: "₦20.00M",
      },
      account_status: "active",
    },
    {
      id: "000002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      kyc_status: "Pending",
      tier: "Gold",
      total_invested: {
        currency: "NGN",
        value: 30000000,
        formatted: "₦30.00M",
      },
      portfolio_value: {
        currency: "NGN",
        value: 10000000,
        formatted: "₦10.00M",
      },
      account_status: "active",
    },
    {
      id: "000003",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      kyc_status: "Rejected",
      tier: "Silver",
      total_invested: {
        currency: "NGN",
        value: 20000000,
        formatted: "₦20.00M",
      },
      portfolio_value: {
        currency: "NGN",
        value: 5000000,
        formatted: "₦5.00M",
      },
      account_status: "suspended",
    },
    {
      id: "000003",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      kyc_status: "Rejected",
      tier: "Silver",
      total_invested: {
        currency: "NGN",
        value: 20000000,
        formatted: "₦20.00M",
      },
      portfolio_value: {
        currency: "NGN",
        value: 5000000,
        formatted: "₦5.00M",
      },
      account_status: "suspended",
    },
  ];

  const filteredData = useMemo(() => {
    return investors.filter((investor) => {
      // Search filter
      const searchMatch =
        searchValue === "" ||
        investor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        investor.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        investor.id.toLowerCase().includes(searchValue.toLowerCase());

      // KYC filter
      const kycMatch =
        kycFilter === "all" ||
        investor.kyc_status.toLowerCase() === kycFilter.toLowerCase();

      // Tier filter
      const tierMatch =
        tierFilter === "all" ||
        investor.tier.toLowerCase() === tierFilter.toLowerCase();

      // Status filter
      const statusMatch =
        statusFilter === "all" ||
        investor.account_status.toLowerCase() === statusFilter.toLowerCase();

      return searchMatch && kycMatch && tierMatch && statusMatch;
    });
  }, [investors, searchValue, kycFilter, tierFilter, statusFilter]);

  const columns: ColumnDef<InvestorsDataTableProp>[] = [
    {
      accessorKey: "name",
      header: "name",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className=" font-semibold text-[#111827]">
            <p>{row.original.name} </p>
            <small className="text-gray-500">{id}</small>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-gray-400 font-normal">{row.original.email}</div>
      ),
    },

    {
      accessorKey: "kyc_status",
      header: "kyc status",
      cell: ({ row }) => {
        const status = row.original.kyc_status;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "tier",
      header: "tier",
      cell: ({ row }) => (
        <div className=" font-medium text-[#314158]">{row.original.tier}</div>
      ),
    },
    {
      accessorKey: "total_invested",
      header: "total invested",
      cell: ({ row }) => (
        <div className="text-[#0F172B] text-base font-semibold">
          {row.original.total_invested.formatted}
        </div>
      ),
    },
    {
      accessorKey: "portfolio_value",
      header: "Wallet Balance",
      cell: ({ row }) => (
        <div className="text-[#0F172B] text-base font-semibold">
          {row.original.portfolio_value.formatted}
        </div>
      ),
    },

    {
      accessorKey: "account_status",
      header: "account status",
      cell: ({ row }) => {
        const status = row.original.account_status;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "action",
      header: "action",
      cell: ({ row }) => {
        const id = row.original.id;
        const investorName = row.original.name;

        return (
          <>
            {/* Desktop: Slide-in panel */}
            <div className="lg:flex hidden">
              <SlideInPanelDrawer
                trigger={<Eye className="w-5 h-5 text-gray-400" />}
                title="Investor Profile"
                subtitle={`Complete details and activity for ${investorName}`}
                width="lg"
              >
                <DetailsView id={id} />
              </SlideInPanelDrawer>
            </div>
           
            <Link href={`/investors/${id}`} className="flex lg:hidden">
              <Button variant="outline">
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHead
        pageTitle="Investor Management"
        subTitle="View and manage all investor accounts"
      >
        <Button
          variant={"outline"}
          className="flex items-center gap-2 rounded-sm"
        >
          <Share /> <span className="hidden lg:block"> Export CSV</span>
        </Button>
      </PageHead>

      <div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap lg:gap-6 gap-3">
        {metrics.map((stat, i) => (
          <StatCard
            label={stat.label}
            description={stat.description}
            value={stat.value}
            Icon={stat.icon}
            color={stat.color}
            key={i}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Table Filters */}
      <TableFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search by user, action, or reference..."
        filters={[
          {
            id: "kyc",
            label: "All KYC",
            value: kycFilter,
            onChange: setKycFilter,
            icon: <Calendar className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All KYC", value: "all" },
              { label: "Approved", value: "approved" },
              { label: "Pending", value: "pending" },
              { label: "Rejected", value: "rejected" },
            ],
          },
          {
            id: "tier",
            label: "All Tiers",
            value: tierFilter,
            onChange: setTierFilter,
            icon: <List className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Tiers", value: "all" },
              { label: "Platinum", value: "platinum" },
              { label: "Gold", value: "gold" },
              { label: "Silver", value: "silver" },
            ],
          },
          {
            id: "status",
            label: "All Status",
            value: statusFilter,
            onChange: setStatusFilter,
            icon: <User className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Suspended", value: "suspended" },
            ],
          },
        ]}
      />

      <ReUseAbleTable
        data={filteredData}
        columns={columns}
        entityName="Investors"
      />
    </div>
  );
}
