export const ENV = {
  REOWN_PROJECT_ID: process.env.EXPO_PUBLIC_REOWN_PROJECT_ID ?? "",

  CONTRACT_ADDRESS: process.env.EXPO_PUBLIC_CONTRACT_ADDRESS ?? "",

  COINGECKO_BASE_URL:
    process.env.EXPO_PUBLIC_COINGECKO_BASE_URL ??
    "https://api.coingecko.com/api/v3",

  EXPO_SEPOLIA_FAUCET_URL:
    process.env.EXPO_SEPOLIA_FAUCET_URL ??
    "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
};
