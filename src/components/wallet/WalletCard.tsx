import React from "react";
import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import { WalletSession } from "@/types/wallet";
import { formatAddress } from "@/utils/format";

type WalletCardProps = {
  session: WalletSession | null;
  isWrongNetwork: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchNetwork: () => void;
  loading?: boolean;
};

export default function WalletCard({
  session,
  isWrongNetwork,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
  loading = false,
}: WalletCardProps) {
  if (!session) {
    return (
      <AppCard className="mt-appLg">
        <AppText variant="subtitle">Wallet</AppText>

        <AppText color="subText" className="mt-appSm">
          Connect your wallet to continue.
        </AppText>

        <AppButton
          title="Connect Wallet"
          onPress={onConnect}
          loading={loading}
          className="mt-appLg"
        />
      </AppCard>
    );
  }

  return (
    <AppCard className="mt-appLg">
      <AppText variant="subtitle">Connected Wallet</AppText>

      <AppText color="subText" className="mt-appSm">
        Address: {formatAddress(session.address)}
      </AppText>

      <AppText color="subText" className="mt-appSm">
        Chain: {session.chainName}
      </AppText>

      <AppText color="subText" className="mt-appSm">
        Chain ID: {session.chainId}
      </AppText>

      <AppText color="subText" className="mt-appSm">
        Balance: {session.balance} ETH
      </AppText>

      {isWrongNetwork ? (
        <AppButton
          title="Switch to Sepolia"
          onPress={onSwitchNetwork}
          className="mt-appLg"
        />
      ) : null}

      <AppButton
        title="Disconnect Wallet"
        variant="danger"
        onPress={onDisconnect}
        className="mt-appLg"
      />
    </AppCard>
  );
}
