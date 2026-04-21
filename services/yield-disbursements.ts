import {
  RetrieveWalletFinanceQuery,
  type CommonRes,
  type FlagYieldDisbursementReq,
  type RetrieveYieldDisbursementLedgerRes,
  type RetrieveYieldDisbursementReviewRes,
  type RetrieveYieldDisbursementsQuery,
  type RetrieveYieldDisbursementsRes,
} from '@/interface';
import { API } from '@/services/axios';

export const retrieveYieldDisbursements = async (
  query: RetrieveYieldDisbursementsQuery,
): Promise<RetrieveYieldDisbursementsRes> => {
  const { data } = await API.get('/investments/admin/yield-disbursements', {
    params: query,
  });

  return data?.data;
};

export const retrieveYieldDisbursementLedger = async (
  eventId: string,
  query: RetrieveWalletFinanceQuery,
): Promise<RetrieveYieldDisbursementLedgerRes> => {
  const { data } = await API.get(
    `/investments/admin/yield-disbursements/${eventId}/ledger`,
    {
      params: query,
    },
  );

  return data?.data;
};

export const flagYieldDisbursement = async (
  eventId: string,
  investmentFundId: number,
  payload: FlagYieldDisbursementReq = {},
): Promise<CommonRes> => {
  const { data } = await API.post(
    `/investments/admin/yield-disbursements/${eventId}/funds/${investmentFundId}/flag`,
    payload,
  );

  return data;
};

export const retrieveYieldDisbursementReview = async (
  reviewId: number,
): Promise<RetrieveYieldDisbursementReviewRes> => {
  const { data } = await API.get(
    `/investments/admin/yield-disbursement-reviews/${reviewId}`,
  );

  return data?.data;
};

export const disburseInvestmentYield = async (
  id: number,
): Promise<CommonRes> => {
  const { data } = await API.post(
    `/investments/admin/${id}/yield-disbursements`,
  );

  return data;
};
