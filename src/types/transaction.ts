export type TransactionStatus =
  | "idle"
  | "validating"
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

export type TransactionStep = {
  key: TransactionStatus;
  label: string;
};