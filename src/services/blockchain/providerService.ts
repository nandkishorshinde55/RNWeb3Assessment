import { ethers } from "ethers";
import { SEPOLIA_CHAIN } from "@/constants/chains";

export const getSepoliaReadProvider = () => {
  return new ethers.JsonRpcProvider(SEPOLIA_CHAIN.rpcUrl);
};

export const getWalletSigner = async (walletProvider: unknown) => {
  const provider = new ethers.BrowserProvider(walletProvider as any);
  return provider.getSigner();
};
