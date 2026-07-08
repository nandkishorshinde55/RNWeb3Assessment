import React, { useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppScreen from "@/components/common/AppScreen";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import TokenHeader from "@/components/token/TokenHeader";
import TokenPriceCard from "@/components/token/TokenPriceCard";
import TokenSupplyCard from "@/components/token/TokenSupplyCard";

import { RootStackParamList } from "@/navigation/types";
import { useTokenDetails } from "@/hooks/useTokenDetails";
import AppButton from "@/components/common/AppButton";
import { useFavoriteToken } from "@/hooks/useFavoriteToken";

type Props = NativeStackScreenProps<RootStackParamList, "TokenDetails">;

export default function TokenDetailsScreen({ route }: Props) {
  const { tokenId } = route.params;

  const { selectedTokenIsFavorite, toggleFavorite } = useFavoriteToken(tokenId);

  const { data, isLoading, isError, refetch, isRefetching } =
    useTokenDetails(tokenId);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <TokenHeader token={data} />

        <AppButton
          title={
            selectedTokenIsFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"
          }
          onPress={() => toggleFavorite(tokenId)}
          variant={selectedTokenIsFavorite ? "danger" : "outline"}
          className="mt-appLg"
        />

        <TokenPriceCard token={data} />

        <TokenSupplyCard token={data} />
      </ScrollView>
    </AppScreen>
  );
}
