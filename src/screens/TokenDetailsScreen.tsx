import React, { useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppScreen from "@/components/common/AppScreen";
import AppHeader from "@/components/common/AppHeader";
import FavoriteButton from "@/components/common/FavoriteButton";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import TokenHeader from "@/components/token/TokenHeader";
import TokenPriceCard from "@/components/token/TokenPriceCard";
import TokenSupplyCard from "@/components/token/TokenSupplyCard";

import { RootStackParamList } from "@/navigation/types";
import { useTokenDetails } from "@/hooks/useTokenDetails";
import { useFavoriteToken } from "@/hooks/useFavoriteToken";

type Props = NativeStackScreenProps<RootStackParamList, "TokenDetails">;

export default function TokenDetailsScreen({ route }: Props) {
  const { tokenId } = route.params;

  const { data, isLoading, isError, refetch, isRefetching } =
    useTokenDetails(tokenId);

  const { selectedTokenIsFavorite, toggleFavorite } =
    useFavoriteToken(tokenId);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <LoadingState message="Loading token details..." />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Unable to load token"
        message="Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <AppScreen>
      <AppHeader
        title="Token Details"
        showBack
        rightAction={
          <FavoriteButton
            active={selectedTokenIsFavorite}
            onPress={() => toggleFavorite(tokenId)}
          />
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <TokenHeader token={data} />

        <TokenPriceCard token={data} />

        <TokenSupplyCard token={data} />
      </ScrollView>
    </AppScreen>
  );
}