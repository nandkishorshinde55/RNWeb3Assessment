import { useFavoriteTokenStore } from "@/store/favoriteTokenStore";

export const useFavoriteToken = (tokenId?: string) => {
  const {
    favoriteTokenIds,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  } = useFavoriteTokenStore();

  const selectedTokenIsFavorite = tokenId
    ? isFavorite(tokenId)
    : false;

  return {
    favoriteTokenIds,
    isFavorite,
    selectedTokenIsFavorite,
    toggleFavorite,
    clearFavorites,
  };
};