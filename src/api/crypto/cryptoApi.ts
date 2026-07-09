import { axiosClient } from "@/api/client/axiosClient";
import { CryptoMarketResponse, TokenDetails } from "@/types/crypto";

type GetMarketsParams = {
  page: number;
  perPage?: number;
};

export const cryptoApi = {
  getMarkets: async ({
    page,
    perPage = 20,
  }: GetMarketsParams): Promise<CryptoMarketResponse> => {
    const response = await axiosClient.get<CryptoMarketResponse>(
      "/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: perPage,
          page,
          sparkline: false,
          price_change_percentage: "24h",
        },
      },
    );
    return response.data;
  },

  getTokenDetails: async (tokenId: string): Promise<TokenDetails> => {
    const response = await axiosClient.get<TokenDetails>(`/coins/${tokenId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    return response.data;
  },
};
