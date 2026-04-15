import { TransactionType } from "@/utils/transactionTypeColors";
export interface Transaction {
  id: number;
  reference: string;
  investorId: number;
  investor: string;
  type: TransactionType;
  amount: number;
  formattedAmount: string;
  date: string;
  time: string;
  status: string;
  description?: string;
}

export interface FinanceStats {
  label: string;
  value: number | string;
  description: string;
  status?: string;
  icon: string;
  color: string;
  bgColor: string;
  iconColor: string;
}

export interface YieldEventRow {
  reference: string;
  investorName: string;
  investorEmail: string;
  propertyName: string;
  yieldRate: string;
  amount: string;
  disbursedDate: string;
  status: string;
}

export const FINANCE_TAB_SECTIONS = [
  { id: "all-transactions", label: "All Transactions", count: 10 },
  { id: "withdrawal-requests", label: "Withdrawal Requests", count: 5 },
  { id: "reconciliation", label: "Reconciliation", count: 0 },
  { id: "yield-events", label: "Yield Events", count: 1 },
  { id: "investors-wallet", label: "Investors Wallet", count: 10 },
];
