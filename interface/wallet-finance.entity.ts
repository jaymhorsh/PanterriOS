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
  status?: "all" | "pending" | "disbursed";
  timeRange?: WalletFinanceTimeRangeFilter;
}

export type YieldDisbursementStatus =
  | "pending"
  | "disbursed"
  | "flagged"
  | "partial";

export interface YieldDisbursementStatusBreakdown {
  pending: number;
  disbursed: number;
  flagged: number;
}

export interface YieldDisbursementItem {
  batchId: string;
  eventId: string;
  investmentId: number;
  investmentName: string;
  totalInvestors: number;
  yieldRate: number;
  totalPayout: number;
  amount: number;
  dateTime: string;
  displayDateLabel: string;
  displayDate: string;
  disbursedAt: string;
  disbursedDate: string;
  disbursedTime: string;
  returnsDate: string;
  status: YieldDisbursementStatus;
  statusBreakdown: YieldDisbursementStatusBreakdown;
}

export interface RetrieveYieldDisbursementsRes {
  message: string;
  summary: WalletFinanceSummary;
  data: YieldDisbursementItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}



export interface YieldDisbursementLedgerInvestor {
  disbursementId: number;
  investorId: number;
  investmentFundId: number;
  disbursementCode: string;
  investorName: string;
  amountInvested: number;
  payoutAmount: number;
  status: YieldDisbursementStatus;
  canFlag: boolean;
  canDisburse: boolean;
  flagReason: string | null;
  flaggedAt: string | null;
}

export interface YieldDisbursementLedger {
  batchId: string;
  eventId: string;
  investmentId: number;
  investmentName: string;
  totalPayout: number;
  yieldRate: number;
  disbursedDate: string;
  returnsDate: string;
  status: YieldDisbursementStatus;
  statusBreakdown: YieldDisbursementStatusBreakdown;
  totalParticipatingInvestors: number;
  investors: YieldDisbursementLedgerInvestor[];
}

export interface RetrieveYieldDisbursementLedgerRes {
  message: string;
  data: YieldDisbursementLedger;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

export type FlagYieldDisbursementReq = Record<string, never>;

export interface YieldDisbursementReviewDetails {
  reviewId: number;
  eventId: string;
  investmentFundId: number;
  disbursementId: number;
  status: string;
  flagReason: string;
  flaggedAt: string;
  resolvedAt?: string | null;
  reviewedBy?: string | null;
  investorName?: string;
  payoutAmount?: number;
  amountInvested?: number;
  disbursementCode?: string;
}

export interface RetrieveYieldDisbursementReviewRes {
  message: string;
  data: YieldDisbursementReviewDetails;
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

export interface WithdrawalRequestItem {
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
  data: WithdrawalRequestItem[];
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

export interface InvestorWalletOverview {
  totalBalance: number;
  availableBalance: number;
  lockedBalance: number;
  activeExposure: number;
  accruedYield: number;
}

export interface InvestorWalletRecentActivityItem {
  id: number;
  title: string;
  description: string;
  occurredAt: string;
  activityType: string;
  badge: string;
  amount: number;
  amountDirection: "credit" | "debit";
  reference: string;
}

export interface InvestorWalletDetails {
  data: {
    walletId: number;
    investorId: number;
    investorCode: string;
    investorName: string;
    investorEmail: string;
    initials: string;
    status: Exclude<InvestorWalletStatusFilter, "all">;
    statusLabel: string;
    overview: InvestorWalletOverview;
    recentActivity: InvestorWalletRecentActivityItem[];
  };
}

export interface WithdrawalRequestActions {
  requestId: string;
  params: { decision: "approve" | "reject"; adminNote: string };
}

export interface WithdrawalRequestDetails {
  requestId: string;
  reference: string;
  status: string;
  statusLabel: string;
  providerStatus: string;
  providerTransactionReference: string;
  payoutInitiatedAt: string;
  auditTrail: WalletFinanceAuditTrailItem[];
}

export interface RetrieveWithdrawalRequestDetailsRes {
  message: string;
  data: WithdrawalRequestDetails;
}
