import React from "react";
import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import { useTheme } from "@/hooks/useAppTheme";
import { useWalletStore } from "@/store/walletStore";

export default function WalletScreen() {
  const { isDark, toggleTheme } = useTheme();

  const { session, setWalletSession, clearWalletSession } = useWalletStore();

  const mockConnectWallet = () => {
    setWalletSession({
      address: "0x1234567890abcdef1234567890abcdef12345678",
      chainId: 11155111,
      chainName: "Ethereum Sepolia",
      balance: "0.05",
    });
  };

  return (
    <AppScreen scrollable>
      <AppText variant="title">Wallet Connection</AppText>

      <AppText color="subText" className="mt-appSm">
        Theme and wallet session are now persisted using Zustand + MMKV.
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

      <AppCard className="mt-appLg">
        <AppText variant="subtitle">Wallet Session</AppText>

        {session ? (
          <>
            <AppText color="subText" className="mt-appSm">
              Address: {session.address}
            </AppText>

            <AppText color="subText" className="mt-appSm">
              Chain: {session.chainName}
            </AppText>

            <AppText color="subText" className="mt-appSm">
              Balance: {session.balance} ETH
            </AppText>

            <AppButton
              title="Clear Wallet Session"
              variant="danger"
              onPress={clearWalletSession}
              className="mt-appLg"
            />
          </>
        ) : (
          <>
            <AppText color="subText" className="mt-appSm">
              No wallet session found.
            </AppText>

            <AppButton
              title="Mock Connect Wallet"
              onPress={mockConnectWallet}
              className="mt-appLg"
            />
          </>
        )}
      </AppCard>
    </AppScreen>
  );
}