// import { ArrowUpRight, ArrowDownLeft, TrendingUp, Zap } from 'lucide-react';

import {
  ArrowDownLeft,
  ArrowUpRight,
  LucideIcon,
  TrendingUp,
  Zap,
} from "lucide-react";

export type TransactionType = "Deposit" | "Withdrawal" | "Investment" | "Yield";

export interface TransactionTypeConfig {
  color: string;
  bgColor: string;
  icon: LucideIcon;
  label: string;
}

export const TRANSACTION_TYPE_CONFIG: Record<
  TransactionType,
  TransactionTypeConfig
> = {
  Deposit: {
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: ArrowDownLeft,
    label: "Deposit",
  },
  Withdrawal: {
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: ArrowUpRight,
    label: "Withdrawal",
  },
  Investment: {
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    icon: TrendingUp,
    label: "Investment",
  },
  Yield: {
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    icon: Zap,
    label: "Yield",
  },
};

export function getTransactionTypeConfig(
  type: TransactionType,
): TransactionTypeConfig {
  return TRANSACTION_TYPE_CONFIG[type];
}

export function getTransactionTypeIcon(type: TransactionType) {
  return TRANSACTION_TYPE_CONFIG[type].icon;
}

export function getTransactionTypeColor(type: TransactionType): string {
  return TRANSACTION_TYPE_CONFIG[type].color;
}

export function getTransactionTypeBgColor(type: TransactionType): string {
  return TRANSACTION_TYPE_CONFIG[type].bgColor;
}
