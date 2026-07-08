import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  AppKit,
  AppKitProvider,
} from "@reown/appkit-react-native";

import QueryProvider from "./QueryProvider";
import RootNavigator from "@/navigation/RootNavigator";
import { appKit } from "@/config/appKitConfig";

export default function AppProviders() {
  return (
    <SafeAreaProvider>
      <AppKitProvider instance={appKit}>
        <QueryProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>

          <AppKit />
        </QueryProvider>
      </AppKitProvider>
    </SafeAreaProvider>
  );
}