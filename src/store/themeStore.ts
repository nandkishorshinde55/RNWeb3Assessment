import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/storage/appStorage";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;

  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",

      toggleTheme: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),

      setTheme: (mode) =>
        set({
          mode,
        }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        mode: state.mode,
      }),
    }
  )
);