import { ethers } from "ethers";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/contract";

import {
  getSepoliaReadProvider,
  getWalletSigner,
} from "@/services/blockchain/providerService";

import { TransactionStatus } from "@/types/transaction";

type StatusCallback = (status: TransactionStatus) => void;

export const contractService = {
  readCurrentValue: async (): Promise<string> => {
    const provider = getSepoliaReadProvider();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider,
    );

    const value = await contract.retrieve();

    return value.toString();
  },

  updateCurrentValue: async ({
    walletProvider,
    value,
    onStatusChange,
  }: {
    walletProvider: unknown;
    value: number;
    onStatusChange?: StatusCallback;
  }) => {
    onStatusChange?.("preparing");

    const signer = await getWalletSigner(walletProvider);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer,
    );

    onStatusChange?.("awaiting_signature");

    const tx = await contract.store(value);

    onStatusChange?.("broadcasting");

    const txHash = tx.hash;

    onStatusChange?.("confirming");

    const receipt = await tx.wait();

    onStatusChange?.("confirmed");

    return {
      hash: txHash,
      receipt,
    };
  },
};
