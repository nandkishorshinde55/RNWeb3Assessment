import React from "react";
import { ActivityIndicator, View } from "react-native";
import AppText from "@/components/common/AppText";

type TokenListFooterProps = {
  loading: boolean;
};

export default function TokenListFooter({ loading }: TokenListFooterProps) {
  if (!loading) return null;

  return (
    <View className="py-appLg items-center">
      <ActivityIndicator />

      <AppText color="subText" className="mt-appSm">
        Loading more tokens...
      </AppText>
    </View>
  );
}
