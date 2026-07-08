export type WalletSession = {
  address: string;
  chainId: number;
  chainName: string;
  balance: string;
  lastConnectedAt: number;
};

export type WalletConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";