import React from "react";
import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ navigation }: Props) {
  return (
    <AppScreen>
      <AppText variant="title">Crypto Dashboard</AppText>

      <AppText color="subText" className="mt-appSm">
        CoinGecko list with infinite scrolling will come here.
      </AppText>

      <AppButton
        title="Open Token Details"
        onPress={() =>
          navigation.navigate("TokenDetails", {
            tokenId: "bitcoin",
          })
        }
        className="mt-appLg"
      />

      <AppButton
        title="Open Smart Contract"
        onPress={() => navigation.navigate("Contract")}
        className="mt-appLg"
      />
    </AppScreen>
  );
}