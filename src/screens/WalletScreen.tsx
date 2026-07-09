import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import WalletCard from "@/components/wallet/WalletCard";
import FaucetHelp from "@/components/wallet/FaucetHelp";

import { RootStackParamList } from "@/navigation/types";
import { useWallet } from "@/hooks/useWallet";
import { useTheme } from "@/hooks/useAppTheme";
import AppHeader from "@/components/common/AppHeader";

type Props = NativeStackScreenProps<RootStackParamList, "Wallet">;

export default function WalletScreen({ navigation }: Props) {
  const { isDark, toggleTheme } = useTheme();

  const {
    isConnected,
    session,
    status,
    error,
    isWrongNetwork,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
    syncSession,
    retryConnection,
    cancelConnection,
  } = useWallet();

  useEffect(() => {
    if (isConnected) {
      syncSession().catch(() => {});
    }
  }, [isConnected, syncSession]);

  return (
    <AppScreen scrollable>
      <AppHeader title="Wallet" />

      <AppText color="subText" className="mt-appSm">
        WalletConnect/Reown integration with Zustand persistence.
      </AppText>

      <AppCard className="mt-appLg">
        <AppText variant="subtitle">Theme</AppText>

        <AppText color="subText" className="mt-appSm">
          Current mode: {isDark ? "Dark" : "Light"}
        </AppText>

        <AppButton
          title={isDark ? "Switch to Light" : "Switch to Dark"}
          onPress={toggleTheme}
          className="mt-appLg"
        />
      </AppCard>

      <WalletCard
        session={session}
        status={status}
        error={error}
        isWrongNetwork={isWrongNetwork}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onSwitchNetwork={switchToSepolia}
        onRetry={retryConnection}
        onCancel={cancelConnection}
      />

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

      {session ? (
        <>
          <FaucetHelp
            address={session.address}
            onRefreshBalance={syncSession}
          />

          <AppButton
            title="Go to Dashboard"
            onPress={() => navigation.navigate("Dashboard")}
            className="mt-appLg"
          />
        </>
      ) : null}
    </AppScreen>
  );
}
