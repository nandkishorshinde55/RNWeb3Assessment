import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/storage/appStorage";

type FavoriteTokenState = {
  favoriteTokenIds: string[];

  isFavorite: (tokenId: string) => boolean;
  toggleFavorite: (tokenId: string) => void;
  clearFavorites: () => void;
};

export const useFavoriteTokenStore = create<FavoriteTokenState>()(
  persist(
    (set, get) => ({
      favoriteTokenIds: [],

      isFavorite: (tokenId) => {
        return get().favoriteTokenIds.includes(tokenId);
      },

      toggleFavorite: (tokenId) =>
        set((state) => {
          const alreadyFavorite =
            state.favoriteTokenIds.includes(tokenId);

          return {
            favoriteTokenIds: alreadyFavorite
              ? state.favoriteTokenIds.filter((id) => id !== tokenId)
              : [...state.favoriteTokenIds, tokenId],
          };
        }),

      clearFavorites: () =>
        set({
          favoriteTokenIds: [],
        }),
    }),
    {
      name: "favorite-token-storage",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        favoriteTokenIds: state.favoriteTokenIds,
      }),
    }
  )
);