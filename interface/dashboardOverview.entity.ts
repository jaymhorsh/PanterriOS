export interface RetrieveDashboardOverviewQuery {
  month?: number;
  year?: number;
  rangeMonths?: number;
  investorTarget?: number;
  investedTarget?: number;
  investmentTarget?: number;
}

export interface DashboardOverviewCards {
  totalInvestors: {
    value: number;
    target: number;
    progressPercentage: number;
    changePercentage: number;
    changeLabel: string;
  };
  totalInvested: {
    value: number;
    target: number;
    progressPercentage: number;
    changePercentage: number;
    changeLabel: string;
  };
  totalInvestments: {
    value: number;
    totalInvestments: number;
    target: number;
    progressPercentage: number;
    newThisMonth: number;
  };
  vaultBalance: {
    value: number;
    changePercentage: number;
    pendingWithdrawals: {
      amount: number;
      count: number;
    };
    activeVaults: number;
  };
}

export interface RetrieveDashboardOverviewRes {
  message: string;
  data: {
    filter: DashboardFilter;
    cards: DashboardOverviewCards;
  };
}

export interface RetrieveDashboardAnalyticsQuery {
  month?: number;
  year?: number;
  rangeMonths?: number;
  investorTarget?: number;
  investedTarget?: number;
  investmentTarget?: number;
}

export interface DashboardInvestorGrowthItem {
  label: string;
  period: string;
  newInvestors: number;
  totalInvestors: number;
}

export interface DashboardPlatformGrowthItem {
  label: string;
  period: string;
  newInvestments: number;
  totalInvestments: number;
  investedAmount: number;
  totalInvested: number;
}

export interface RetrieveDashboardAnalyticsRes {
  message: string;
  data: DashboardanalyticsData;
}

export interface DashboardanalyticsData {
  filter: DashboardFilter;
  investorGrowth: DashboardInvestorGrowthItem[];
  platformGrowth: DashboardPlatformGrowthItem[];
}
export interface RetrieveDashboardPortfolioOverviewQuery {
  month?: number;
  year?: number;
  rangeMonths?: number;
  investorTarget?: number;
  investedTarget?: number;
  investmentTarget?: number;
  distribution?: string;
}

export interface DashboardPortfolioDistributionItem {
  label: string;
  value: number;
  percentage: number;
}

export interface RetrieveDashboardPortfolioOverviewRes {
  message: string;
  data: {
    filter: DashboardFilter;
    summary: DashboardDataSummary;
    distribution: {
      type: string;
      items: DashboardPortfolioDistributionItem[];
    };
  };
}

export interface RetrieveDashboardTopProjectsQuery {
  month?: number;
  year?: number;
  rangeMonths?: number;
  investorTarget?: number;
  investedTarget?: number;
  investmentTarget?: number;
  limit?: number;
}

export interface DashboardTopProjectItem {
  investmentId: number;
  projectName: string;
  amountRaised: number;
  targetAmount: number;
  percentageCovered: number;
  fundedLabel: string;
  roi: number;
  roiLabel: string;
  investorCount: number;
}

export interface RetrieveDashboardTopProjectsRes {
  message: string;
  data: {
    filter: DashboardFilter;
    summary: DashboardDataSummary;
    projects: DashboardTopProjectItem[];
  };
}

export interface RetrieveDashboardActivityQuery {
  month?: number;
  year?: number;
  rangeMonths?: number;
  investorTarget?: number;
  investedTarget?: number;
  investmentTarget?: number;
  limit?: number;
}

export interface DashboardActivityTransaction {
  id: number;
  investorId: number;
  investorName: string;
  type: string;
  amount: number;
  reference: string;
  description: string;
  contextLabel: string | null;
  status: string;
  sourceService: string;
  occurredAt: Date;
  occurredAtLabel: string;
  investmentId: number | null;
  projectName: string | null;
}

export interface RetrieveDashboardActivityRes {
  message: string;
  data: {
    filter: DashboardFilter;
    recentTransactions: DashboardActivityTransaction[];
  };
}

export interface AppStatusRes {
  message?: string;
  status?: string;
  [key: string]: unknown;
}

export interface DashboardFilter {
  month: number;
  year: number;
  distribution?: string;
  limit?: number;
  rangeMonths?: number;
}

export interface DashboardDataSummary {
  title: string;
  subtitle: string;
  total?: number;
  totalAssets?: number;
}
