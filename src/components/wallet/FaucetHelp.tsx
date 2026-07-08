import React from "react";
import { Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";

type Props = {
  address: string;
  onRefreshBalance?: () => Promise<void>;
};

const SEPOLIA_FAUCET_URL =
  "https://cloud.google.com/application/web3/faucet/ethereum/sepolia";

export default function FaucetHelp({ address, onRefreshBalance }: Props) {
  const copyAddress = async () => {
    await Clipboard.setStringAsync(address);
    Alert.alert("Copied", "Wallet address copied.");
  };

  const openFaucet = async () => {
    await Linking.openURL(SEPOLIA_FAUCET_URL);
  };

  return (
    <AppCard className="mt-appLg">
      <AppText variant="subtitle">Need Sepolia ETH?</AppText>

      <AppText color="subText" className="mt-appSm">
        You need test ETH only for write transactions.
      </AppText>

      <AppText color="subText" className="mt-appSm">
        {address}
      </AppText>

      <AppButton
        title="Copy Wallet Address"
        onPress={copyAddress}
        className="mt-appLg"
      />

      <AppButton
        title="Open Sepolia Faucet"
        onPress={openFaucet}
        variant="outline"
        className="mt-appSm"
      />

      {onRefreshBalance ? (
        <AppButton
          title="Refresh Balance"
          onPress={onRefreshBalance}
          variant="ghost"
          className="mt-appSm"
        />
      ) : null}
    </AppCard>
  );
}