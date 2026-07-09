import { useCallback } from "react";
import { ethers } from "ethers";
import { useAccount, useAppKit, useProvider } from "@reown/appkit-react-native";

import { SEPOLIA_CHAIN } from "@/constants/chains";
import { useWalletStore } from "@/store/walletStore";
import { formatEthBalance } from "@/utils/format";
import { sepoliaNetwork } from "@/config/appKitConfig";

export const useWallet = () => {
  const { open, disconnect, switchNetwork } = useAppKit();
  const { address, chainId, isConnected } = useAccount();
  const { provider } = useProvider();

  const {
    session,
    status,
    error,
    setConnecting,
    setWalletSession,
    setWalletError,
    clearWalletSession,
  } = useWalletStore();

  const fetchAndSaveWalletSession = useCallback(async () => {
    try {
      if (!address || !chainId || !provider) {
        return;
      }

      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const balanceWei = await ethersProvider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);

      setWalletSession({
        address,
        chainId: Number(chainId),
        chainName:
          Number(chainId) === SEPOLIA_CHAIN.chainId
            ? SEPOLIA_CHAIN.name
            : "Unsupported Network",
        balance: formatEthBalance(balanceEth),
      });
    } catch (error: any) {
      setWalletError(error?.message || "Unable to fetch wallet session.");
    }
  }, [address, chainId, provider, setWalletSession, setWalletError]);

  const connectWallet = useCallback(async () => {
    try {
      setConnecting();
      await open();
    } catch (error: any) {
      setWalletError(error?.message || "Wallet connection failed.");
    }
  }, [open, setConnecting, setWalletError]);

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
      clearWalletSession();
    } catch {
      clearWalletSession();
    }
  }, [disconnect, clearWalletSession]);

  const switchToSepolia = useCallback(async () => {
    try {
      await switchNetwork(sepoliaNetwork);
    } catch (error: any) {
      setWalletError(error?.message || "Unable to switch network.");
    }
  }, [switchNetwork, setWalletError]);

  const isWrongNetwork =
    Boolean(chainId) && Number(chainId) !== SEPOLIA_CHAIN.chainId;

  return {
    address,
    chainId,
    isConnected,
    provider,

    session,
    status,
    error,
    isWrongNetwork,

    connectWallet,
    disconnectWallet,
    switchToSepolia,
    fetchAndSaveWalletSession,
  };
};
