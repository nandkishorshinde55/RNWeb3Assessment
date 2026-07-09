import React from "react";
import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import {
  WalletError,
  WalletSession,
  WalletStatus,
} from "@/types/wallet";

import { formatAddress } from "@/utils/format";

type WalletCardProps = {
  session: WalletSession | null;
  status: WalletStatus;
  error: WalletError | null;
  isWrongNetwork: boolean;

  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchNetwork: () => void;
  onRetry: () => void;
  onCancel: () => void;
};

export default function WalletCard({
  session,
  status,
  error,
  isWrongNetwork,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
  onRetry,
  onCancel,
}: WalletCardProps) {
  const isLoading = status === "connecting";

  if (!session) {
    return (
      <AppCard className="mt-appLg">
        <AppText variant="subtitle">Wallet</AppText>

        <AppText color="subText" className="mt-appSm">
          Connect your wallet to continue.
        </AppText>

        {status === "connecting" ? (
          <AppText color="warning" className="mt-appMd">
            Waiting for wallet connection...
          </AppText>
        ) : null}

        {status === "switching" ? (
          <AppText color="warning" className="mt-appMd">
            Switching to Ethereum Sepolia...
          </AppText>
        ) : null}

        {status === "disconnecting" ? (
          <AppText color="subText" className="mt-appMd">
            Disconnecting wallet...
          </AppText>
        ) : null}

        {error ? (
          <>
            <AppText color="danger" className="mt-appMd">
              {error.title}
            </AppText>

            <AppText color="subText" className="mt-appSm">
              {error.message}
            </AppText>

            <AppButton
              title="Try Again"
              onPress={onRetry}
              className="mt-appLg"
            />
          </>
        ) : null}

        {!error ? (
          <AppButton
            title="Connect Wallet"
            onPress={onConnect}
            loading={isLoading}
            disabled={isLoading}
            className="mt-appLg"
          />
        ) : null}

        {isLoading ? (
          <AppButton
            title="Cancel"
            variant="outline"
            onPress={onCancel}
            className="mt-appSm"
          />
        ) : null}
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
        <>
          <AppText color="warning" className="mt-appMd">
            Wrong network. Please switch to Ethereum Sepolia.
          </AppText>

          <AppButton
            title="Switch to Sepolia"
            onPress={onSwitchNetwork}
            loading={status === "switching"}
            disabled={status === "switching"}
            className="mt-appLg"
          />
        </>
      ) : null}

      {error ? (
        <>
          <AppText color="danger" className="mt-appMd">
            {error.title}
          </AppText>

          <AppText color="subText" className="mt-appSm">
            {error.message}
          </AppText>
        </>
      ) : null}

      <AppButton
        title="Disconnect Wallet"
        variant="danger"
        onPress={onDisconnect}
        loading={status === "disconnecting"}
        className="mt-appLg"
      />
    </AppCard>
  );
}
