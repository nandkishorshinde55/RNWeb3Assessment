import React from "react";
import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { useTheme } from "@/hooks/useAppTheme";

type Props = NativeStackScreenProps<RootStackParamList, "Wallet">;

export default function WalletScreen({ navigation }: Props) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <AppScreen>
      <AppText variant="title">Wallet Connection</AppText>

      <AppText color="subText" className="mt-appSm">
        Connect your wallet to access dashboard.
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

      <AppButton
        title="Go to Dashboard"
        onPress={() => navigation.navigate("Dashboard")}
        className="mt-appLg"
      />
    </AppScreen>
  );
}