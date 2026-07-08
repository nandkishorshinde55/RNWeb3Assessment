export const QueryKeys = {
  cryptoMarkets: ["cryptoMarkets"] as const,

  tokenDetails: (tokenId: string) =>
    ["tokenDetails", tokenId] as const,
};