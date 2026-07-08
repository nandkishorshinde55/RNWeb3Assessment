import React from "react";
import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "TokenDetails">;

export default function TokenDetailsScreen({ route }: Props) {
  const { tokenId } = route.params;

  return (
    <AppScreen>
      <AppText variant="title">Token Details</AppText>

      <AppText color="subText" className="mt-appSm">
        Selected token: {tokenId}
      </AppText>
    </AppScreen>
  );
}