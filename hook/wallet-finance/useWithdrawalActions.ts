import { WithdrawalRequestActions } from "@/interface";
import { withdrawalRequest } from "@/services/wallet-finance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useWithdrawalActions = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: withdrawalAction,
    isPending,
    isError,
    variables,
  } = useMutation({
    mutationFn: (param: WithdrawalRequestActions) => withdrawalRequest(param),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet-finance", "transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallet-finance", "withdrawal-approvals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallet-finance", "withdrawal-request-details"],
      });
    },
  });
  return { withdrawalAction, isPending, isError, variables };
};
