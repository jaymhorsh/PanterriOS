import {
  type RetrieveWalletFinanceQuery,
  type RetrieveWalletFinanceRes,
  type RetrieveWalletFinanceTransactionDetailsRes,
  type RetrieveInvestorWalletsQuery,
  type RetrieveInvestorWalletsRes,
  type InvestorWalletDetails,
  type RetrieveWithdrawalApprovalsQuery,
  type RetrieveWithdrawalApprovalsRes,
  WithdrawalRequestActions,
  RetrieveWithdrawalRequestDetailsRes,
} from '@/interface';
import { API } from '@/services/axios';

export const retrieveWalletFinance = async (
  params: RetrieveWalletFinanceQuery,
): Promise<RetrieveWalletFinanceRes> => {
  const { data } = await API.get(
    '/investor-wallet/admin/finance/transactions',
    {
      params,
    },
  );

  return data?.data;
};

export const retrieveWalletFinanceTransactionDetails = async (
  transactionId: number,
): Promise<RetrieveWalletFinanceTransactionDetailsRes> => {
  const { data } = await API.get(
    `/investor-wallet/admin/finance/transactions/${transactionId}`,
  );

  return data?.data;
};

export const retrieveWithdrawalApprovals = async (
  query: RetrieveWithdrawalApprovalsQuery,
): Promise<RetrieveWithdrawalApprovalsRes> => {
  const { data } = await API.get(
    '/investor-wallet/admin/withdrawals/approvals',
    {
      params: query,
    },
  );

  return data?.data;
};

export const retrieveInvestorWallets = async (
  query: RetrieveInvestorWalletsQuery,
): Promise<RetrieveInvestorWalletsRes> => {
  const { data } = await API.get('/investor-wallet/admin/investor-wallets', {
    params: query,
  });

  return data;
};

export const retrieveInvestorWalletDetails = async (
  investorId: number,
): Promise<InvestorWalletDetails> => {
  const { data } = await API.get(
    `/investor-wallet/admin/investor-wallets/${investorId}`,
  );

  return data?.data;
};

// wallet-finance-actions

export const withdrawalRequest = async (
  params: WithdrawalRequestActions,
): Promise<{ message: string }> => {
  const { data } = await API.post(
    `/investor-wallet/admin/withdrawals/approvals/${params.requestId}/decision`,
    params.params,
  );

  return data;
};

export const retrieveWithdrawalRequestDetails = async (
  requestId: string,
): Promise<RetrieveWithdrawalRequestDetailsRes> => {
  const { data } = await API.get(
    `/investor-wallet/admin/withdrawals/approvals/${requestId}`,
  );
  return data?.data;
};
