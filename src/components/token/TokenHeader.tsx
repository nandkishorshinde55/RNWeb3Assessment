import React from "react";
import { Image, View } from "react-native";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";

import { TokenDetails } from "@/types/crypto";

type Props = {
  token: TokenDetails;
};

export default function TokenHeader({ token }: Props) {
  return (
    <AppCard>
      <View className="flex-row items-center">
        <Image
          source={{
            uri: token.image.large,
          }}
          className="w-16 h-16 rounded-full"
        />

        <View className="ml-appLg flex-1">
          <AppText variant="title">{token.name}</AppText>

          <AppText color="subText" className="uppercase mt-appXs">
            {token.symbol}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
