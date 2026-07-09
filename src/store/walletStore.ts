import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/storage/appStorage";
import { WalletConnectionStatus, WalletSession } from "@/types/wallet";

type WalletState = {
  session: WalletSession | null;
  status: WalletConnectionStatus;
  error: string | null;

  setConnecting: () => void;

  setWalletSession: (session: Omit<WalletSession, "lastConnectedAt">) => void;

  updateBalance: (balance: string) => void;

  setWalletError: (message: string) => void;

  clearWalletSession: () => void;
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      session: null,
      status: "disconnected",
      error: null,

      setConnecting: () =>
        set({
          status: "connecting",
          error: null,
        }),

      setWalletSession: (session) =>
        set({
          session: {
            ...session,
            lastConnectedAt: Date.now(),
          },
          status: "connected",
          error: null,
        }),

      updateBalance: (balance) =>
        set((state) => {
          if (!state.session) return state;

          return {
            session: {
              ...state.session,
              balance,
            },
          };
        }),

      setWalletError: (message) =>
        set({
          status: "error",
          error: message,
        }),

      clearWalletSession: () =>
        set({
          session: null,
          status: "disconnected",
          error: null,
        }),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        session: state.session,
      }),
    },
  ),
);
