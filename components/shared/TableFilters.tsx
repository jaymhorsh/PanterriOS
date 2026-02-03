"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "@/utils/helpers";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
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
  filters = [],
}: TableFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const debouncedSearchChange = useMemo(
    () => debounce((value: string) => onSearchChange(value), 500),
    [onSearchChange],
  );

  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  return (
    <div className="flex flex-col justify-between sm:flex-row items-start sm:items-center gap-3 mb-6">
      {/* Search Bar */}
      <div className="relative border rounded-sm shadow-xs w-fit">
        <Search className="text-gray-600 pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder={searchPlaceholder}
          value={localSearch}
          onChange={(e) => {
            const value = e.target.value;
            setLocalSearch(value);
            debouncedSearchChange(value);
          }}
          className="border-border  placeholder:text-[#636363] h-9 pr-8 pl-10 text-sm"
          aria-label="Search tasks"
        />

        {localSearch && (
          <div
            onClick={() => {
              setLocalSearch("");
              onSearchChange("");
              debouncedSearchChange("");
            }}
            className="absolute top-1/2 right-2 flex -translate-y-1/2 bg-gray-900 p-1 rounded-full cursor-pointer"
            aria-label="Clear search"
            tabIndex={0}
          >
            <X className="text-white h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {filters.map((filter) => (
          <Select
            key={filter.id}
            value={filter.value}
            onValueChange={filter.onChange}
          >
            <SelectTrigger className="rounded-sm items-center w-full bg-white border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                {filter.icon}
                <SelectValue placeholder={filter.label} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
    </div>
  );
}
