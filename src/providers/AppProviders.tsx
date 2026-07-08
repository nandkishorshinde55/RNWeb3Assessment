import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import QueryProvider from "./QueryProvider";
import RootNavigator from "@/navigation/RootNavigator";

export default function AppProviders() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
}