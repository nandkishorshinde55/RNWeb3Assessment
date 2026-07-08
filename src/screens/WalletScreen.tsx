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
    fetchAndSaveWalletSession,
  } = useWallet();

  useEffect(() => {
    if (isConnected) {
      fetchAndSaveWalletSession();
    }
  }, [isConnected, fetchAndSaveWalletSession]);

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
        isWrongNetwork={isWrongNetwork}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onSwitchNetwork={switchToSepolia}
        loading={status === "connecting"}
      />

      {error ? (
        <AppText color="danger" className="mt-appSm">
          {error}
        </AppText>
      ) : null}

      {session ? (
        <>
          <FaucetHelp
            address={session.address}
            onRefreshBalance={fetchAndSaveWalletSession}
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