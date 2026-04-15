"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ReusableSelect } from "@/components/ui/ReusableSelect";
import { Search, X } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  title?: string;
  subtitle?: string;
  search?: boolean;
  filters?: {
    id: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
    icon?: React.ReactNode;
  }[];
}

export function TableFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search by user, action, or reference...",
  title,
  subtitle,
  search = true,
  filters = [],
}: TableFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);
  const hasHeader = Boolean(title || subtitle);

  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-4 lg:flex lg:items-start lg:justify-between">
      {/* Header Section */}
      <div className="flex w-full flex-col gap-3 sm:flex-row justify-between lg:min-w-[420px] lg:items-end">
        {hasHeader && (
          <div className="px-1 pt-1 sm:px-0 ">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        )}
        {/* Filter Dropdowns */}
        <div className="ml-auto grid w-full grid-cols-2 gap-2 lg:w-auto lg:flex lg:flex-wrap lg:justify-end">
          {filters.map((filter) => (
            <div key={filter.id} className="w-full lg:w-[180px]">
              <ReusableSelect
                value={filter.value}
                onChange={filter.onChange}
                placeholder={filter.label}
                items={filter.options}
                icon={filter.icon}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Search Bar & Filters Together */}
      <div className="flex w-full flex-col pt-2 gap-3 sm:flex-row justify-between lg:min-w-[420px] lg:items-end">
        <div className="flex w-full max-sm:flex-col gap-3 sm:justify-between">
          {search && (
            <div className="relative flex  w-fit bg-[#F3F4F6] rounded-sm border shadow-xs lg:max-w-lg">
              <Search className="text-gray-600 pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform" />

              <Input
                placeholder={searchPlaceholder}
                value={localSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalSearch(value);
                  onSearchChange(value);
                }}
                className="h-9 w-full border-border  pl-10 pr-8 text-sm placeholder:text-[#636363] sm:min-w-[220px]"
                aria-label="Search tasks"
              />

              {localSearch && (
                <div
                  onClick={() => {
                    setLocalSearch("");
                    onSearchChange("");
                  }}
                  className="absolute top-1/2 right-2 flex -translate-y-1/2 bg-gray-900 p-1 rounded-full cursor-pointer"
                  aria-label="Clear search"
                  tabIndex={0}
                >
                  <X className="text-white h-3.5 w-3.5" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
