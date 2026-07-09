import { create } from "zustand";
import { WalletError, WalletSession, WalletStatus } from "@/types/wallet";

type WalletState = {
  session: WalletSession | null;
  status: WalletStatus;
  error: WalletError | null;

  setStatus: (status: WalletStatus) => void;
  setSession: (session: WalletSession) => void;
  setError: (error: WalletError) => void;
  clearError: () => void;
  resetWallet: () => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  session: null,
  status: "idle",
  error: null,

  setStatus: (status) => set({ status }),

  setSession: (session) =>
    set({
      session,
      status: "connected",
      error: null,
    }),

  setError: (error) =>
    set({
      error,
      status: "error",
    }),

  clearError: () => set({ error: null }),

  resetWallet: () =>
    set({
      session: null,
      status: "idle",
      error: null,
    }),
}));
