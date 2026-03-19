"use client";

import type * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface ReusableSelectItem {
  label: string;
  value: string;
}

interface ReusableSelectProps {
  items: ReusableSelectItem[];
  placeholder: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ReusableSelect({
  items,
  placeholder,
  onChange,
  value,
  className,
  icon,
}: ReusableSelectProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={cn("h-9 w-full rounded-sm border-[#E5E7EB] bg-white", className)}
      >
        <div className="flex items-center gap-2">
          {icon ? <span className="text-sm">{icon}</span> : null}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}