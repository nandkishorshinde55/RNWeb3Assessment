import { useQuery } from "@tanstack/react-query";
import { cryptoApi } from "@/api/crypto/cryptoApi";
import { QueryKeys } from "@/constants/queryKeys";

export const useTokenDetails = (tokenId: string) => {
  return useQuery({
    queryKey: QueryKeys.tokenDetails(tokenId),
    queryFn: () => cryptoApi.getTokenDetails(tokenId),
    enabled: Boolean(tokenId),
    staleTime: 1000 * 60,
    retry: 2,
  });
};