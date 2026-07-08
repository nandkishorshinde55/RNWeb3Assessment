import React from "react";
import { View } from "react-native";
import { useTheme } from "@/hooks/useAppTheme";

type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AppCard({
  children,
  className = "",
}: AppCardProps) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-app-dark-card border-app-dark-border"
    : "bg-app-light-card border-app-light-border";

  return (
    <View className={`rounded-appXl border p-appLg ${cardClass} ${className}`}>
      {children}
    </View>
  );
}