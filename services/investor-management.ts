import {
  InvestorManagementListRes,
  InvestorOverviewRes,
  RetrieveInvestorOverviewQuery,
  RetrieveInvestorsQuery,
} from '@/interface';
import { API } from '@/services/axios';

function getPayload<T>(value: unknown): T {
  if (
    typeof value === 'object' &&
    value !== null &&
    'statusCode' in value &&
    'data' in value
  ) {
    return (value as { data: T }).data;
  }

  return value as T;
}

export const retrieveInvestors = async (
  query: RetrieveInvestorsQuery,
): Promise<InvestorManagementListRes> => {
  const { data } = await API.get('/investor-management/admin/investors', {
    params: query,
  });

  return getPayload<InvestorManagementListRes>(data);
};

export const retrieveInvestorOverview = async (
  investorId: number,
  query: RetrieveInvestorOverviewQuery = {},
): Promise<InvestorOverviewRes> => {
  const { data } = await API.get(
    `/investor-management/admin/investors/${investorId}/overview`,
    {
      params: query,
    },
  );

  return getPayload<InvestorOverviewRes>(data);
};
