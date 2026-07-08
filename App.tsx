import "@walletconnect/react-native-compat";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "./global.css";

import React from "react";
import AppProviders from "@/providers/AppProviders";

export default function App() {
  return <AppProviders />;
}