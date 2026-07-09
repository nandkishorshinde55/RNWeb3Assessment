import React from "react";
import { Linking } from "react-native";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";

import TransactionStepper from "@/components/contract/TransactionStepper";

import { SEPOLIA_CHAIN } from "@/constants/chains";
import { TransactionState } from "@/types/transaction";

type Props = {
  transaction: TransactionState;
  onReset?: () => void;
};

export default function TransactionStatusCard({ transaction, onReset }: Props) {
  if (transaction.status === "idle") return null;

  const openEtherscan = () => {
    if (!transaction.hash) return;

    Linking.openURL(`${SEPOLIA_CHAIN.explorerUrl}/tx/${transaction.hash}`);
  };

  return (
    <AppCard className="mt-appLg">
      <AppText variant="subtitle">Transaction Flow</AppText>

      <TransactionStepper currentStatus={transaction.status} />

      {transaction.error ? (
        <AppText color="danger" className="mt-appMd">
          {transaction.error}
        </AppText>
      ) : null}

      {transaction.hash ? (
        <>
          <AppText color="subText" className="mt-appMd">
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

      {onReset ? (
        <AppButton
          title="Clear Status"
          onPress={onReset}
          variant="ghost"
          className="mt-appSm"
        />
      ) : null}
    </AppCard>
  );
}
