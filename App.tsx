import "./global.css";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppCard from "@/components/common/AppCard";
import { useThemeStore } from "@/store/themeStore";

export default function App() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
     <SafeAreaProvider>
    <AppScreen>
      <AppText variant="title">RN Web3 Assessment</AppText>

      <AppText color="subText" className="mt-appSm">
        NativeWind theme system is working.
      </AppText>

      <AppCard className="mt-appLg">
        <AppText variant="subtitle">Wallet</AppText>
        <AppText color="subText" className="mt-appSm">
          This card uses centralized NativeWind theme colors.
        </AppText>
      </AppCard>

      <AppInput
        label="Search Token"
        placeholder="Search bitcoin, ethereum..."
        className="mt-appLg"
      />

      <AppButton
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onPress={toggleTheme}
        className="mt-appLg"
      />
    </AppScreen>
    </SafeAreaProvider>
  );
}