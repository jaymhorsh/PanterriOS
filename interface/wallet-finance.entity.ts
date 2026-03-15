export type WalletFinanceTransactionTypeFilter =
  | "all"
  | "deposit"
  | "withdrawal"
  | "investment"
  | "yield"
  | "investment_opt_out";

export type WalletFinanceTransactionStatusFilter =
  | "all"
  | "completed"
  | "pending"
  | "processing"
  | "approved"
  | "rejected"
  | "failed";

export type WalletFinanceTimeRangeFilter =
  | "all_time"
  | "today"
  | "this_week"
  | "this_month";

export interface RetrieveWalletFinanceQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: WalletFinanceTransactionTypeFilter;
  status?: WalletFinanceTransactionStatusFilter;
  timeRange?: WalletFinanceTimeRangeFilter;
}

export interface WalletFinanceSummary {
  totalBalance: number;
  activeVaults: number;
  totalYieldsDisbursed: number;
  pendingWithdrawals: {
    amount: number;
    count: number;
  };
}

export interface WalletFinanceTransaction {
  id: number;
  reference: string;
  investorId: number;
  investorName: string;
  type: WalletFinanceTransactionTypeFilter;
  amount: number;
  dateTime: string;
  status: WalletFinanceTransactionStatusFilter;
  description: string;
}

export interface RetrieveWalletFinanceRes {
  message: string;
  data: {
    summary: WalletFinanceSummary;
    data: WalletFinanceTransaction[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      limit: number;
    };
  };
}

export interface WalletFinanceAuditTrailItem {
  title: string;
  dateTime: string;
}

export interface WalletFinanceTransactionDetails {
  id: number;
  reference: string;
  investorId: number;
  investorName: string;
  type: Exclude<WalletFinanceTransactionTypeFilter, "all">;
  typeLabel: string;
  amount: number;
  status: Exclude<WalletFinanceTransactionStatusFilter, "all">;
  statusLabel: string;
  description: string;
  dateTime: string;
  date: string;
  time: string;
  auditTrail: WalletFinanceAuditTrailItem[];
}

export interface RetrieveWalletFinanceTransactionDetailsRes {
  message: string;
  data: WalletFinanceTransactionDetails;
}

export interface RetrieveYieldDisbursementsQuery {
  page?: number;
  limit?: number;
  search?: string;
  timeRange?: WalletFinanceTimeRangeFilter;
}

export interface YieldDisbursementItem {
  reference: string;
  investorId: number;
  investorName: string;
  investorEmail: string;
  propertyName: string;
  yieldRate: number;
  amount: number;
  disbursedDate: string;
  status: string;
}

export interface RetrieveYieldDisbursementsRes {
  message: string;
  data: YieldDisbursementItem[];
  summary?: WalletFinanceSummary;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

// ─── Withdrawal Approvals ────────────────────────────────────────────────────

export type WithdrawalApprovalStatusFilter =
  | "all"
  | "pending"
  | "processing"
  | "approved"
  | "rejected";

export type WithdrawalApprovalRiskProfileFilter =
  | "all"
  | "low_risk"
  | "medium_risk"
  | "high_risk";

export interface RetrieveWithdrawalApprovalsQuery {
  page?: number;
  limit?: number;
  status?: WithdrawalApprovalStatusFilter;
  riskProfile?: WithdrawalApprovalRiskProfileFilter;
  search?: string;
}

export interface WithdrawalApprovalItem {
  requestId: string;
  investorId: number;
  investorName: string;
  investorEmail: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  processingFee: number;
  totalDeduction: number;
  riskProfile: string;
  riskProfileLabel: string;
  status: string;
  statusLabel: string;
  reference: string;
  createdAt: string;
}

export interface RetrieveWithdrawalApprovalsRes {
  message: string;
  data: WithdrawalApprovalItem[];
  summary?: WalletFinanceSummary;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

export type InvestorWalletStatusFilter =
  | "all"
  | "active"
  | "suspended"
  | "closed";

export interface RetrieveInvestorWalletsQuery {
  page?: number;
  limit?: number;
  status?: InvestorWalletStatusFilter;
  search?: string;
}

export interface InvestorWalletItem {
  walletId: number;
  investorId: number;
  investorCode: string;
  investorName: string;
  investorEmail: string;
  balance: number;
  availableBalance: number;
  lockedBalance: number;
  invested: number;
  returns: number;
  status: Exclude<InvestorWalletStatusFilter, "all">;
  statusLabel: string;
  createdAt: string;
}

export interface RetrieveInvestorWalletsRes {
  message: string;
  data: {
    data: {
      data: InvestorWalletItem[];
      summary: WalletFinanceSummary;
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        limit: number;
      };
    };
  };
}
