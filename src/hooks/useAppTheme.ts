import { useMemo } from "react";
import { useThemeStore } from "@/store/themeStore";

export const useTheme = () => {
  const { mode, toggleTheme, setTheme } = useThemeStore();

  const isDark = useMemo(() => mode === "dark", [mode]);

  return {
    mode,
    isDark,
    toggleTheme,
    setTheme,
  };
};