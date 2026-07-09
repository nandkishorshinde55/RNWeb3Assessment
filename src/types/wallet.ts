export type WalletConnectionStatus =
  "disconnected" | "connecting" | "connected" | "error";

export type WalletProviderLike = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

export type WalletStatus =
  "idle" | "connecting" | "connected" | "switching" | "disconnecting" | "error";

export type WalletSession = {
  address: string;
  chainId: number;
  chainName: string;
  balance: string;
};

export type WalletError = {
  title: string;
  message: string;
};
