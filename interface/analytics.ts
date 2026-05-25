import { Pagination } from '.';

export interface AnalyticsQueryParams {
  per_page?: number;
  page?: number;
  all?: boolean;
  signalCategory?: string;
  city?: string;
  selection?: string;
  subMarket?: string;
  status?: string;
  area?: string;
}

export interface AnalyticsOverviewRes {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: {
    filters: {
      signalCategory: string;
      city: string | null;
    };
    insightsIntelligence: InsightIntelligence[];
    investmentScore: InvestmentScore[];
    marketShare: MarketShare[];
    infrastructureProjects: InfrastructureProject[];
  };
}
export interface AnalyticsIntelligenceRes {
  meta: {
    status_code: number;
    success: boolean;
    pagination: Pagination;
  };
  data: InsightIntelligence[];
}
export interface AnalyticsIntelligence {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: InsightIntelligence;
}

export interface AnalyticsIntelligenceReq {
  insightCategory: string;
  title: string;
  description: string;
  indication: string;
  impactLevel: string;
}

export interface InsightIntelligence {
  _id: string;
  insightCategory: string;
  title: string;
  __v: number;
  createdAt: Date;
  description: string;
  impactLevel: 'Low' | 'Medium' | 'High';
  indication: string;
  updatedAt: Date;
  status: string;
}

export interface InvestmentScore {
  _id: string;
  city: string;
  area: string;
  sampleAsset: string;
  subMarket: string;
  __v: number;
  createdAt: Date;
  demandLevel: 'Low' | 'Medium' | 'High';
  expectedReturnMax: number;
  expectedReturnMin: number;
  notes: string;
  rank: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  updatedAt: Date;
}

export interface MarketShare {
  _id: string;
  subMarket: string;
  city: string;
  period: string;
  __v: number;
  createdAt: Date;
  marketShareSelectionPercent: number;
  source: string;
  updatedAt: Date;
}

export interface InfrastructureProject {
  _id: string;
  city: string;
  projectName: string;
  __v: number;
  createdAt: Date;
  estimatedCompletion: string;
  estimatedValueNgn: number;
  estimatedValueNgnBillions: number;
  projectType: string;
  status: string;
  updatedAt: Date;
}

export interface GeographyData {
  meta: GeographyMeta;
  data: GeographyDatum[];
}

export interface GeographyDatum {
  _id: string;
  city: string;
  area: string;
  sampleType: string;
  subMarket: string;
  __v: number;
  averageRentPerAnnum: string;
  averageSalePrice: string | number;
  averageYearOverYearGrowth: string | number;
  createdAt: Date;
  dataFrequency: string | number;
  estimatedNumberOfListings: string | number;
  lastUpdated: string | number;
  maxSalePrice: string | number;
  medianSalePrice: string | number;
  minRent: string | number;
  source: string | number;
  updatedAt: Date;
  vacancyRate: string | number;
  yield: string | number;
}

export interface GeographyMeta {
  status_code: number;
  success: boolean;
  pagination: Pagination;
}

export interface BuildingMaterialTraker {
  meta: BuildingMaterialMeta;
  data: BuildingMaterialDatum[];
}

export interface BuildingMaterialDatum {
  _id: string;
  materialName: string;
  __v: number;
  createdAt: Date;
  imageUrl: string;
  price: number;
  priceTrend: string;
  updatedAt: Date;
}

export interface BuildingMaterialMeta {
  status_code: number;
  success: boolean;
  pagination: Pagination;
}

export interface AnalyticsInvestmentScoreReq {
  city: string;
  area: string;
  subMarket: string;
  sampleAsset: string;
  expectedReturnMin: number;
  expectedReturnMax: number;
  riskLevel: string;
  demandLevel: string;
  notes: string;
}
export interface AnalyticsInvestmentScoreRes {
  meta: {
    status_code: number;
    success: boolean;
    pagination: Pagination;
  };
  data: InvestmentScore[];
}
export interface AnalyticsInvestmentScore {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: InvestmentScore;
}

export interface InvestmentScore {
  source: string;
  lastUpdatedBySource: string;
  _id: string;
  subMarket: string;
  sampleAsset: string;
  area: string;
  city: string;
  __v: number;
  createdAt: Date;
  demandLevel: 'Low' | 'Medium' | 'High';
  expectedReturnMax: number;
  expectedReturnMin: number;
  notes: string;
  rank: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  updatedAt: Date;
}
export interface AnalyticsPriceTrendRes {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: AnalyticsPriceTrend[];
}
export interface AnalyticsPriceTrend {
  _id: string;
  propertyType: string;
  city: string;
  area: string;
  bedrooms: string;
  year: number;
  month: string;
  __v: number;
  averageRent: number;
  averageRentInMillions: number;
  averageYearOverYearGrowth: number;
  createdAt: Date;
  estimatedNumberOfListings: number;
  medianRent: number;
  updatedAt: Date;
}
