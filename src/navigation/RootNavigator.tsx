import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WalletScreen from "@/screens/WalletScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import TokenDetailsScreen from "@/screens/TokenDetailsScreen";
import ContractScreen from "@/screens/ContractScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TokenDetails" component={TokenDetailsScreen} />
      <Stack.Screen name="Contract" component={ContractScreen} />
    </Stack.Navigator>
  );
}
