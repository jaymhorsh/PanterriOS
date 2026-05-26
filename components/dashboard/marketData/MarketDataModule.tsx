"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHead, StatCard, TableSkeleton } from "@/components/shared";
import {
  BadgeDollarSign,
  Building2,
  Download,
  MapPin,
  MapPinned,
  Plus,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useDetailedMarketData } from "@/hook/marketData/marketData";
import { MarketDataTable } from "./MarketDataTable";
import { MarketPriceTrendChart } from "./marketPriceTrendChart";

const MARKET_CITIES = ["Lagos", "Abuja", "Port Harcourt"];

const iconMap = {
  building: Building2,
  growth: TrendingUp,
  price: BadgeDollarSign,
  area: MapPinned,
};

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;

  const normalized = value.replace(/[^\d.-]/g, "");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: unknown) {
  const amount = toNumber(value);

  if (!amount) return "—";

  if (Math.abs(amount) >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }

  if (Math.abs(amount) >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1)}K`;
  }

  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatPercent(value: unknown) {
  const amount = toNumber(value);

  if (!amount) return "0.0%";

  const percent = Math.abs(amount) <= 1 ? amount * 100 : amount;

  return `${percent.toFixed(1)}%`;
}

function formatUpdatedAt(value?: string) {
  if (!value) return "No recent updates";

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}

export function MarketDataModule() {
  const [selectedCity, setSelectedCity] = useState<"Lagos" | "Abuja" | "Port Harcourt">("Lagos");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: marketDataResponse,
    isLoading: isMarketLoading,
    error: marketError,
    refetch: refetchMarketData,
  } = useDetailedMarketData({
    page: currentPage,
    per_page: 10,
    city: selectedCity,
    all: false,
  });

  const marketRows = marketDataResponse?.data ?? [];
  const loading = isMarketLoading;
  const latestUpdate =
    marketRows[0]?.updatedAt ?? marketRows[marketRows.length - 1]?.updatedAt;
  const totalItems =
    marketDataResponse?.meta?.pagination?.total_count ?? marketRows.length;
  const limit = marketDataResponse?.meta?.pagination?.per_page ?? 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const propertyTypeCount = useMemo(
    () => new Set(marketRows.map((row) => row.sampleAssetType)).size,
    [marketRows],
  );

  const averageGrowth = useMemo(() => {
    if (!marketRows.length) return "0.0%";

    const total = marketRows.reduce(
      (sum, row) => sum + toNumber(row.growthVal),
      0,
    );

    return formatPercent(total / marketRows.length);
  }, [marketRows]);

  const medianPrice = useMemo(() => {
    if (!marketRows.length) return "₦0";

    const total = marketRows.reduce(
      (sum, row) => sum + toNumber(row.averageSalePrice),
      0,
    );

    return formatCurrency(total / marketRows.length);
  }, [marketRows]);

  const stats = useMemo(
    () => [
      {
        label: "Total Volume",
        value: totalItems.toLocaleString("en-NG"),
        description: "Properties tracked",
        icon: iconMap.building,
        iconColor: "text-[#155DFC]",
        bgColor: "bg-[#DBEAFE]",
        badge: "8.2%",
        badgeClassName: "border-[#BFDBFE] bg-[#EFF6FF] text-[#155DFC]",
      },
      {
        label: "Avg. Growth",
        value: averageGrowth,
        description: "Month-over-month",
        icon: iconMap.growth,
        iconColor: "text-emerald-600",
        bgColor: "bg-emerald-100",
        badge: "MoM",
        badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
      },
      {
        label: "Median Price",
        value: medianPrice,
        description: "Average median",
        icon: iconMap.price,
        iconColor: "text-[#A855F7]",
        bgColor: "bg-[#F3E8FF]",
        badge: "Trend",
        badgeClassName: "border-[#E9D5FF] bg-[#FAF5FF] text-[#7E22CE]",
      },
      {
        label: "Property Types",
        value: propertyTypeCount.toString(),
        description: "Categories tracked",
        icon: iconMap.area,
        iconColor: "text-[#F97316]",
        bgColor: "bg-[#FFEDD5]",
        badge: "Tracked",
        badgeClassName: "border-orange-200 bg-orange-50 text-orange-700",
      },
    ],
    [averageGrowth, medianPrice, propertyTypeCount, totalItems],
  );

  return (
    <div className=" space-y-8">
      <PageHead
        pageTitle="Nigerian Real Estate Market Data"
        subTitle="Comprehensive property price analysis across major cities"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-sm border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#111827]  hover:bg-[#F8FAFC]"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="h-10 rounded-sm bg-[#111111] px-4 text-sm font-medium text-white  hover:bg-black/90">
            <Plus className="h-4 w-4" />
            Add Market Data
          </Button>
        </div>
      </PageHead>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="inline-flex w-fit flex-wrap items-center gap-2 rounded-md border border-[#E5E7EB] bg-gray-100 p-1 px-2">
          {MARKET_CITIES.map((city) => {
            const isActive = selectedCity === city;

            return (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSelectedCity(city as "Lagos" | "Abuja" | "Port Harcourt");
                  setCurrentPage(1);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-[#3F4A5A] hover:bg-[#F8FAFC]",
                )}
              >
                <MapPin className="h-4 w-4" />
                {city}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-5 rounded-md border border-[#FDE68A] bg-[#FEF3C7] px-4 py-3 shadow-sm">
          <div>
            <p className="text-sm font-medium pb-2 text-[#9A5A06]">
              Market data last updated
            </p>
            <p className="text-xs text-[#78350F]">
              {formatUpdatedAt(latestUpdate)}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-8 rounded-sm border-[#F0C85B] bg-white px-2 text-xs font-medium text-black hover:bg-[#FFFDF5]"
            onClick={() => refetchMarketData()}
          >
            <RefreshCcw
              className={`h-3.5 w-3.5 ${isMarketLoading ? "animate-spin" : ""} `}
            />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              Icon={stat.icon}
              iconColor={stat.iconColor}
              bgColor={stat.bgColor}
              status={stat.badge}
              statusClassName={stat.badgeClassName}
            />
          );
        })}
      </div>

      {marketError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Unable to load market data.
        </div>
      ) : null}

      {loading ? (
        <TableSkeleton rows={8} columns={9} />
      ) : (
        <MarketDataTable
          city={selectedCity}
          rows={marketRows}
          pagination={{
            currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
            limit: limit,
            onPageChange: setCurrentPage,
          }}
        />
      )}

      <MarketPriceTrendChart city={selectedCity} />
    </div>
  );
}
