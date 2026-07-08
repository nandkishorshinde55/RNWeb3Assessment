import React, { memo } from "react";
import { Image, Pressable, View } from "react-native";

import AppText from "@/components/common/AppText";
import { CryptoToken } from "@/types/crypto";
import { useFavoriteToken } from "@/hooks/useFavoriteToken";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercentage,
} from "@/utils/format";

type TokenListItemProps = {
  token: CryptoToken;
  onPress: (tokenId: string) => void;
};

function TokenListItem({
  token,
  onPress,
}: TokenListItemProps) {
  const { isFavorite, toggleFavorite } =
    useFavoriteToken(token.id);

  const tokenIsFavorite = isFavorite(token.id);

  const isPositive =
    (token.price_change_percentage_24h ?? 0) >= 0;

  return (
    <Pressable
      onPress={() => onPress(token.id)}
      className="flex-row items-center border-b border-app-light-border dark:border-app-dark-border py-appMd"
    >
      <Image
        source={{ uri: token.image }}
        className="w-11 h-11 rounded-full mr-appMd"
      />

      <View className="flex-1">
        <View className="flex-row items-center">
          <AppText variant="bodyMedium">
            {token.name}
          </AppText>

          {tokenIsFavorite ? (
            <AppText className="ml-appSm">
              ⭐
            </AppText>
          ) : null}
        </View>

        <AppText
          color="subText"
          variant="caption"
          className="uppercase mt-1"
        >
          {token.symbol}
        </AppText>
      </View>

      <View className="items-end mr-appSm">
        <AppText variant="bodyMedium">
          {formatCurrency(token.current_price)}
        </AppText>

        <AppText color={isPositive ? "success" : "danger"}>
          {formatPercentage(token.price_change_percentage_24h)}
        </AppText>

        <AppText color="subText" variant="caption">
          MC {formatCompactCurrency(token.market_cap)}
        </AppText>
      </View>

      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          toggleFavorite(token.id);
        }}
        className="w-9 h-9 rounded-appPill items-center justify-center bg-app-light-surface dark:bg-app-dark-surface border border-app-light-border dark:border-app-dark-border"
      >
        <AppText>
          {tokenIsFavorite ? "★" : "☆"}
        </AppText>
      </Pressable>
    </Pressable>
  );
}

export default memo(TokenListItem);