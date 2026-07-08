import React, { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";

import TokenListItem from "@/components/crypto/TokenListItem";
import TokenListEmpty from "@/components/crypto/TokenListEmpty";
import TokenListFooter from "@/components/crypto/TokenListFooter";

import { useCryptoMarketsInfinite } from "@/hooks/useCryptoMarketsInfinite";
import { useFavoriteToken } from "@/hooks/useFavoriteToken";
import { RootStackParamList } from "@/navigation/types";
import { CryptoToken } from "@/types/crypto";
import AppHeader from "@/components/common/AppHeader";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ navigation }: Props) {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCryptoMarketsInfinite();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favoriteTokenIds } = useFavoriteToken();

  const tokens = useMemo<CryptoToken[]>(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  const filteredTokens = useMemo(() => {
    const query = search.trim().toLowerCase();

    let list = tokens;

    if (showFavoritesOnly) {
      list = list.filter((token) => favoriteTokenIds.includes(token.id));
    }

    if (!query) return list;

    return list.filter((token) => {
      return (
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
      );
    });
  }, [tokens, search, showFavoritesOnly, favoriteTokenIds]);

  const handleTokenPress = useCallback(
    (tokenId: string) => {
      navigation.navigate("TokenDetails", {
        tokenId,
      });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    const isSearching = Boolean(search.trim());

    if (!isSearching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [search, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderToken = useCallback(
    ({ item }: { item: CryptoToken }) => {
      return <TokenListItem token={item} onPress={handleTokenPress} />;
    },
    [handleTokenPress],
  );

  const renderEmpty = useCallback(() => {
    return <TokenListEmpty search={search} />;
  }, [search]);

  const renderFooter = useCallback(() => {
    return <TokenListFooter loading={isFetchingNextPage} />;
  }, [isFetchingNextPage]);

  if (isLoading) {
    return <LoadingState message="Loading cryptocurrencies..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load crypto market"
        message="Please check your internet connection and try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <AppScreen>
    <AppHeader title="Crypto Dashboard" showBack/>

      <AppText color="subText" className="mt-appSm">
        Market data powered by CoinGecko.
      </AppText>

      <AppInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search token..."
        className="mt-appLg"
      />

      <View className="flex-row mt-appMd">
        <AppButton
          title={showFavoritesOnly ? "Show All Coins" : "Show Favorites"}
          onPress={() => setShowFavoritesOnly((prev) => !prev)}
          variant="outline"
          className="flex-1"
        />
      </View>

      <AppButton
        title="Open Smart Contract"
        onPress={() => navigation.navigate("Contract")}
        className="mt-appMd"
      />

      <FlatList
        data={filteredTokens}
        keyExtractor={(item) => item.id}
        renderItem={renderToken}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={10}
        removeClippedSubviews
        contentContainerClassName="pb-appXl"
      />
    </AppScreen>
  );
}
