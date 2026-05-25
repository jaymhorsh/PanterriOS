import {
  AnalyticsOverviewRes,
  AnalyticsQueryParams,
  GeographyData,
  BuildingMaterialTraker,
  AnalyticsIntelligenceRes,
  AnalyticsIntelligenceReq,
  AnalyticsInvestmentScoreReq,
  AnalyticsInvestmentScoreRes,
  AnalyticsInvestmentScore as AnalyticsInvestmentScoreItem,
  AnalyticsIntelligence,
  AnalyticsPriceTrendRes,
} from '@/interface';
import { ANALYTICS_API } from '@/services/axios';

export const AnalyticsOverview = async (
  params: AnalyticsQueryParams,
): Promise<AnalyticsOverviewRes> => {
  const { data } = await ANALYTICS_API.get('/analytics/overview', {
    params,
  });
  return data;
};

export const AnalyticsInsightIntelligence = async (
  params: AnalyticsQueryParams,
): Promise<AnalyticsIntelligenceRes> => {
  const { data } = await ANALYTICS_API.get('/analytics/insights-intelligence', {
    params,
  });
  return data;
};

export const CreateAnalyticsInsightIntelligence = async (
  body: AnalyticsIntelligenceReq,
): Promise<AnalyticsIntelligence> => {
  const { data } = await ANALYTICS_API.post(
    '/analytics/insights-intelligence',
    body,
  );
  return data;
};

export const EditAnalyticsInsightIntelligence = async (
  id: string,
  body: AnalyticsIntelligenceReq,
): Promise<AnalyticsIntelligence> => {
  const { data } = await ANALYTICS_API.post(
    `/analytics/insights-intelligence/${id}`,
    body,
  );
  return data;
};

export const UpdateStatusOnAnalyticsIntelligence = async (
  id: string,
  body: { status: string },
): Promise<AnalyticsIntelligence> => {
  const { data } = await ANALYTICS_API.patch(
    `/analytics/insights-intelligence/${id}/status`,
    body,
  );
  return data;
};

export const LandingPageGeographydata = async (
  params: AnalyticsQueryParams,
): Promise<GeographyData> => {
  const { data } = await ANALYTICS_API.get('/analytics/geography-data', {
    params,
  });
  return data;
};

export const BuildingMatrialTraker =
  async (): Promise<BuildingMaterialTraker> => {
    const { data } = await ANALYTICS_API.get(
      '/analytics/building-materials-tracker',
    );
    return data;
  };

export const AnalyticsInvestmentScore = async (
  params: AnalyticsQueryParams,
): Promise<AnalyticsInvestmentScoreRes> => {
  const { data } = await ANALYTICS_API.get('/analytics/investment-score', {
    params,
  });
  return data;
};

export const CreateAnalyticsInvestmentScore = async (
  body: AnalyticsInvestmentScoreReq,
): Promise<AnalyticsInvestmentScoreItem> => {
  const { data } = await ANALYTICS_API.post(
    '/analytics/investment-score',
    body,
  );
  return data;
};

export const EditAnalyticsInvestmentScore = async (
  id: string,
  body: AnalyticsInvestmentScoreReq,
): Promise<AnalyticsInvestmentScoreItem> => {
  const { data } = await ANALYTICS_API.post(
    `/analytics/investment-score/${id}`,
    body,
  );
  return data;
};

export const DeleteInvestmentScore = async (
  id: string,
  body: { status: string },
): Promise<AnalyticsInvestmentScoreRes> => {
  const { data } = await ANALYTICS_API.delete(
    `/analytics/investment-score/${id}/status`,
    { data: body },
  );
  return data;
};

export const getAnalyticsPriceTrend = async (
  params: AnalyticsQueryParams,
): Promise<AnalyticsPriceTrendRes> => {
  const { data } = await ANALYTICS_API.get(
    `/analytics/residential-price-tracker`,
    { params },
  );
  return data;
};
