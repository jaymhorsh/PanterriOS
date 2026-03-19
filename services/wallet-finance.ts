import {
  type RetrieveWalletFinanceQuery,
  type RetrieveWalletFinanceRes,
  type RetrieveWalletFinanceTransactionDetailsRes,
  type RetrieveYieldDisbursementsQuery,
  type RetrieveYieldDisbursementsRes,
  type RetrieveInvestorWalletsQuery,
  type RetrieveInvestorWalletsRes,
  type RetrieveWithdrawalApprovalsQuery,
  type RetrieveWithdrawalApprovalsRes,
} from "@/interface";
import API from "@/services/axios";

export const retrieveWalletFinance = async (
  params: RetrieveWalletFinanceQuery,
): Promise<RetrieveWalletFinanceRes> => {
  const { data } = await API.get(
    "/investor-wallet/admin/finance/transactions",
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

export const retrieveYieldDisbursements = async (
  query: RetrieveYieldDisbursementsQuery,
): Promise<RetrieveYieldDisbursementsRes> => {
  const { data } = await API.get("/investments/admin/yield-disbursements", {
    params: query,
  });

  return data?.data;
};

export const retrieveWithdrawalApprovals = async (
  query: RetrieveWithdrawalApprovalsQuery,
): Promise<RetrieveWithdrawalApprovalsRes> => {
  const { data } = await API.get(
    "/investor-wallet/admin/withdrawals/approvals",
    {
      params: query,
    },
  );

  return data?.data;
};

export const retrieveInvestorWallets = async (
  query: RetrieveInvestorWalletsQuery,
): Promise<RetrieveInvestorWalletsRes> => {
  const { data } = await API.get("/investor-wallet/admin/investor-wallets", {
    params: query,
  });

  return data;
};
