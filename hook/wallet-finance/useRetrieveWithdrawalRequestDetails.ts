import { useQuery } from "@tanstack/react-query";
import { retrieveWithdrawalRequestDetails } from "@/services/wallet-finance";

export function useRetrieveWithdrawalRequestDetails(
  requestId?: string,
  enabled = true,
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["wallet-finance", "withdrawal-request-details", requestId],
    queryFn: () => retrieveWithdrawalRequestDetails(requestId as string),
    enabled: enabled && Boolean(requestId),
  });

  return { data: data?.data, isLoading, error, refetch };
}
