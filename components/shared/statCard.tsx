import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { StatCardSkeleton } from "./loader";

interface CardProp {
  label: string;
  Icon?: LucideIcon | string;
  value: string | number;
  description?: string;
  status?: string;
  color?: string;
  bgColor?: string;
  trendingValue?: string;
  TrendIcon?: LucideIcon;
  iconColor?: string;
  statusClassName?: string;
  loading?: boolean;
}

export function StatCard({
  label,
  Icon,
  value,
  description,
  status,
  color,
  bgColor,
  trendingValue,
  TrendIcon,
  iconColor,
  statusClassName,

}: CardProp) {
  const statusText = status ?? trendingValue;



  return (
    <div className="w-full rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8">
      <div className="mb-8 flex items-start justify-between">
        {typeof Icon === "string" ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F4F6] text-2xl font-bold text-[#9CA3AF]">
            {Icon}
          </div>
        ) : Icon ? (
          <span
            className={cn(
              "flex h-12 w-13 items-center justify-center rounded-lg",
              bgColor ?? "bg-[#F1E8FF]",
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor ?? "text-[#7E22CE]")} />
          </span>
        ) : null}

        {statusText ? (
          <span
            className={cn(
              "inline-flex items-center rounded-sm border border-[#D8B4FE] bg-[#F5EFFF] px-4 py-1.5 text-sm font-medium text-[#7E22CE]",
              statusClassName,
            )}
          >
            {statusText}
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <p className="text-base font-normal text-[#45556C]">{label}</p>

        <div
          className={cn(
            "pt-1 text-3xl font-bold leading-tight text-[#111827] [overflow-wrap:anywhere]",
            color,
          )}
        >
          {value}
        </div>

        {description ? (
          <p className="text-sm text-[#5B6B87]">{description}</p>
        ) : TrendIcon && trendingValue ? (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-success">
              <TrendIcon className={cn("h-4 w-4", iconColor)} />
            </span>
            <span className="text-success text-sm font-medium">
              {trendingValue}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
