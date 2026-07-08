export type TransactionStatus =
  | "idle"
  | "preparing"
  | "awaiting_signature"
  | "broadcasting"
  | "confirming"
  | "confirmed"
  | "failed";

export type TransactionState = {
  status: TransactionStatus;
  hash: string | null;
  error: string | null;
};