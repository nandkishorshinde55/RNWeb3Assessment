import React from "react";
import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";

export default function ContractScreen() {
  return (
    <AppScreen>
      <AppText variant="title">Smart Contract</AppText>

      <AppText color="subText" className="mt-appSm">
        Sepolia contract read/write will come here.
      </AppText>
    </AppScreen>
  );
}