export type CryptoToken = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number | null;
};

export type CryptoMarketResponse = CryptoToken[];

export type TokenDetails = {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number | null;
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    price_change_percentage_24h: number | null;
  };
};
