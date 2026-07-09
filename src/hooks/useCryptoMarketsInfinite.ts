import { useInfiniteQuery } from "@tanstack/react-query";
import { cryptoApi } from "@/api/crypto/cryptoApi";
import { QueryKeys } from "@/constants/queryKeys";

const PER_PAGE = 20;

export const useCryptoMarketsInfinite = () => {
  return useInfiniteQuery({
    queryKey: QueryKeys.cryptoMarkets,
    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      return cryptoApi.getMarkets({
        page: Number(pageParam),
        perPage: PER_PAGE,
      });
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PER_PAGE) {
        return undefined;
      }

      return allPages.length + 1;
    },

    staleTime: 1000 * 60,
    retry: 2,
  });
};
