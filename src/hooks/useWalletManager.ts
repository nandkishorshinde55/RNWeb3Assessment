import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAccount, useAppKit, useProvider } from "@reown/appkit-react-native";
import { ethers } from "ethers";

import { sepoliaNetwork } from "@/config/appKitConfig";
import { useWalletStore } from "@/store/walletStore";

const SEPOLIA_CHAIN_ID = 11155111;
const SEPOLIA_CHAIN_HEX = "0xaa36a7";
const CONNECTION_TIMEOUT = 30000;

const getWalletError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error ?? "");

  if (message.includes("timeout")) {
    return {
      title: "Connection Timeout",
      message: "Wallet connection timed out. Please try again.",
    };
  }

  if (message.includes("rejected") || message.includes("denied")) {
    return {
      title: "Connection Rejected",
      message: "You rejected the wallet request.",
    };
  }

  return {
    title: "Wallet Error",
    message: "Unable to connect wallet. Please try again.",
  };
};

export function useWalletManager() {
  const { open, disconnect, switchNetwork } = useAppKit();
  const { address, chainId, isConnected } = useAccount();
  const { provider } = useProvider();

  const {
    session,
    status,
    error,
    setStatus,
    setSession,
    setError,
    clearError,
    resetWallet,
  } = useWalletStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disconnectingRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const isWrongNetwork = useMemo(() => {
    if (!chainId) return false;
    return Number(chainId) !== SEPOLIA_CHAIN_ID;
  }, [chainId]);

  const syncSession = useCallback(async () => {
    if (disconnectingRef.current) return;
    if (!isConnected || !address || !chainId || !provider) return;

    const ethersProvider = new ethers.BrowserProvider(provider as any);
    const balanceWei = await ethersProvider.getBalance(address);
    const balanceEth = ethers.formatEther(balanceWei);

    setSession({
      address,
      chainId: Number(chainId),
      chainName:
        Number(chainId) === SEPOLIA_CHAIN_ID
          ? "Ethereum Sepolia"
          : "Unsupported Network",
      balance: Number(balanceEth).toFixed(5),
    });
  }, [isConnected, address, chainId, provider, setSession]);

  const connectWallet = useCallback(() => {
    if (status === "connecting") return;

    clearTimer();
    clearError();
    disconnectingRef.current = false;

    setStatus("connecting");

    try {
      open();

      timerRef.current = setTimeout(() => {
        if (!isConnected) {
          setError({
            title: "Connection Timeout",
            message:
              "Wallet modal was closed or approval was not completed. Please try again.",
          });
        }
      }, CONNECTION_TIMEOUT);
    } catch (err) {
      setError(getWalletError(err));
    }
  }, [open, status, isConnected, setStatus, setError, clearError]);

  const disconnectWallet = useCallback(async () => {
    try {
      clearTimer();
      disconnectingRef.current = true;
      setStatus("disconnecting");

      await disconnect();
    } catch {
      // ignore SDK disconnect errors
    } finally {
      resetWallet();

      setTimeout(() => {
        disconnectingRef.current = false;
      }, 1500);
    }
  }, [disconnect, setStatus, resetWallet]);

  const switchToSepolia = useCallback(async () => {
    if (!provider) {
      setError({
        title: "Provider Missing",
        message: "Wallet provider is not ready. Please reconnect wallet.",
      });
      return;
    }

    try {
      clearError();
      setStatus("switching");

      try {
        switchNetwork(sepoliaNetwork);
      } catch {
        await (provider as any).request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: SEPOLIA_CHAIN_HEX }],
        });
      }

      setTimeout(() => {
        syncSession().catch((err) => setError(getWalletError(err)));
      }, 1500);
    } catch (err: any) {
      if (err?.code === 4902) {
        try {
          await (provider as any).request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_HEX,
                chainName: "Ethereum Sepolia",
                nativeCurrency: {
                  name: "Sepolia Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        } catch (addError) {
          setError(getWalletError(addError));
        }
      } else {
        setError(getWalletError(err));
      }
    }
  }, [provider, switchNetwork, syncSession, setStatus, setError, clearError]);

  const retryConnection = useCallback(() => {
    resetWallet();
    setTimeout(connectWallet, 300);
  }, [resetWallet, connectWallet]);

  const cancelConnection = useCallback(() => {
    clearTimer();
    resetWallet();
  }, [resetWallet]);

  useEffect(() => {
    if (!isConnected || !address || !chainId || !provider) return;
    if (disconnectingRef.current) return;

    clearTimer();

    const timer = setTimeout(() => {
      syncSession().catch((err) => setError(getWalletError(err)));
    }, 800);

    return () => clearTimeout(timer);
  }, [isConnected, address, chainId, provider, syncSession, setError]);

  useEffect(() => {
    if (!isConnected && session && !disconnectingRef.current) {
      resetWallet();
    }
  }, [isConnected, session, resetWallet]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return {
    address,
    chainId,
    provider,
    isConnected,

    session,
    status,
    error,
    isWrongNetwork,

    connectWallet,
    disconnectWallet,
    switchToSepolia,
    syncSession,
    retryConnection,
    cancelConnection,
  };
}
