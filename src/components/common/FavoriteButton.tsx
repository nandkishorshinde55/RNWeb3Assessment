import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useAppTheme";

type FavoriteButtonProps = {
  active: boolean;
  onPress: () => void;
  size?: number;
  className?: string;
};

export default function FavoriteButton({
  active,
  onPress,
  size = 24,
  className = "",
}: FavoriteButtonProps) {
  const { isDark } = useTheme();

  return (
    <Pressable onPress={onPress} hitSlop={12} className={`p-1 ${className}`}>
      <Ionicons
        name={active ? "heart" : "heart-outline"}
        size={size}
        color={active ? "#FF3B30" : isDark ? "#E5E7EB" : "#6B7280"}
      />
    </Pressable>
  );
}
