import { useCallback, useEffect, useState } from "react";

import { contractService } from "@/services/blockchain/contractService";
import { getBlockchainErrorMessage } from "@/services/blockchain/blockchainErrorMapper";
import { TransactionState } from "@/types/transaction";
import { useWallet } from "@/hooks/useWallet";
import { SEPOLIA_CHAIN } from "@/constants/chains";

export const useContract = () => {
  const { provider, session } = useWallet();

  const [currentValue, setCurrentValue] = useState<string>("");
  const [loadingValue, setLoadingValue] = useState(false);

  const [transaction, setTransaction] = useState<TransactionState>({
    status: "idle",
    hash: null,
    error: null,
  });

  const readValue = useCallback(async () => {
    try {
      setLoadingValue(true);

      const value = await contractService.readCurrentValue();

      setCurrentValue(value);
    } catch (error) {
      setTransaction({
        status: "failed",
        hash: null,
        error: getBlockchainErrorMessage(error),
      });
    } finally {
      setLoadingValue(false);
    }
  }, []);

  const updateValue = useCallback(
    async (value: number) => {
      try {
        if (!session) {
          setTransaction({
            status: "failed",
            hash: null,
            error: "Please connect your wallet first.",
          });
          return;
        }

        if (!provider) {
          setTransaction({
            status: "failed",
            hash: null,
            error: "Wallet provider is not available.",
          });
          return;
        }

        if (session.chainId !== SEPOLIA_CHAIN.chainId) {
          setTransaction({
            status: "failed",
            hash: null,
            error: "Wrong network. Please switch to Ethereum Sepolia.",
          });
          return;
        }

        setTransaction({
          status: "preparing",
          hash: null,
          error: null,
        });

        const result = await contractService.updateCurrentValue({
          walletProvider: provider,
          value,
          onStatusChange: (status) => {
            setTransaction((prev) => ({
              ...prev,
              status,
            }));
          },
        });

        setTransaction({
          status: "confirmed",
          hash: result.hash,
          error: null,
        });

        await readValue();
      } catch (error) {
        setTransaction({
          status: "failed",
          hash: null,
          error: getBlockchainErrorMessage(error),
        });
      }
    },
    [provider, session, readValue]
  );

  useEffect(() => {
    readValue();
  }, [readValue]);

  return {
    currentValue,
    loadingValue,
    transaction,
    readValue,
    updateValue,
  };
};