import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CardProp {
  label: string;
  Icon?: LucideIcon | string;
  value: string | number;
  description?: string;
  color?: string;
  bgColor?: string;
  trendingValue?: string;
  TrendIcon?: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  label,
  Icon,
  value,
  description,
  color,
  bgColor,
  trendingValue,
  TrendIcon,
  iconColor,
}: CardProp) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-6 w-full">
      <div className="flex items-start justify-between mb-8">
        <span className="text-[#45556C] text-base font-normal">{label}</span>
        {typeof Icon === "string" ? (
          <div className="font-bold text-2xl text-[#9CA3AF]">{Icon}</div>
        ) : Icon ? (
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              bgColor,
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </span>
        ) : null}
      </div>

      <div
        className={cn(
          "mb-2 text-2xl sm:text-2xl font-bold capitalize text-[#000000] leading-tight [overflow-wrap:anywhere]",
          color,
        )}
      >
        {value}
      </div>

      {description ? (
        <p className="text-[#45556C] text-sm">{description}</p>
      ) : trendingValue ? (
        <div className="flex gap-2 items-center">
          {TrendIcon && (
            <span className="text-success">
              <TrendIcon className={cn("w-4 h-4", iconColor)} />
            </span>
          )}
          <span className="text-success  text-sm font-medium">
            {trendingValue}
          </span>
        </div>
      ) : null}
    </div>
  );
}
