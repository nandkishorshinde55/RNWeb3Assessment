import { TransactionStep } from "@/types/transaction";

export const TRANSACTION_STEPS: TransactionStep[] = [
  {
    key: "validating",
    label: "Validating wallet and network",
  },
  {
    key: "preparing",
    label: "Preparing transaction",
  },
  {
    key: "awaiting_signature",
    label: "Awaiting wallet signature",
  },
  {
    key: "broadcasting",
    label: "Broadcasting transaction",
  },
  {
    key: "confirming",
    label: "Waiting for block confirmation",
  },
  {
    key: "confirmed",
    label: "Transaction confirmed",
  },
];
