import React from "react";
import { Linking } from "react-native";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";

import { SEPOLIA_CHAIN } from "@/constants/chains";
import { TransactionState } from "@/types/transaction";

type Props = {
  transaction: TransactionState;
};

const statusLabel = {
  idle: "Idle",
  preparing: "Preparing Transaction",
  awaiting_signature: "Awaiting Wallet Signature",
  broadcasting: "Broadcasting Transaction",
  confirming: "Waiting for Block Confirmation",
  confirmed: "Transaction Confirmed",
  failed: "Transaction Failed",
};

export default function TransactionStatusCard({
  transaction,
}: Props) {
  if (transaction.status === "idle") return null;

  const openEtherscan = () => {
    if (!transaction.hash) return;

    Linking.openURL(`${SEPOLIA_CHAIN.explorerUrl}/tx/${transaction.hash}`);
  };

  return (
    <AppCard className="mt-appLg">
      <AppText variant="subtitle">Transaction Status</AppText>

      <AppText
        color={transaction.status === "failed" ? "danger" : "subText"}
        className="mt-appMd"
      >
        {statusLabel[transaction.status]}
      </AppText>

      {transaction.error ? (
        <AppText color="danger" className="mt-appSm">
          {transaction.error}
        </AppText>
      ) : null}

      {transaction.hash ? (
        <>
          <AppText color="subText" className="mt-appSm">
            Hash: {transaction.hash}
          </AppText>

          <AppButton
            title="View on Etherscan"
            onPress={openEtherscan}
            variant="outline"
            className="mt-appLg"
          />
        </>
      ) : null}
    </AppCard>
  );
}