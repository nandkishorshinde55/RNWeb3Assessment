import React from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppText from "@/components/common/AppText";
import { useTheme } from "@/hooks/useAppTheme";

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
};

export default function AppHeader({
  title,
  showBack = false,
  rightAction,
}: AppHeaderProps) {
  const navigation = useNavigation();
  const { isDark } = useTheme();

  const iconColor = isDark ? "#F9FAFB" : "#111827";

  return (
    <View className="flex-row items-center justify-between mb-appLg">
      <View className="w-10">
        {showBack ? (
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={26} color={iconColor} />
          </Pressable>
        ) : null}
      </View>

      <AppText variant="subtitle" center className="flex-1">
        {title}
      </AppText>

      <View className="w-10 items-end">{rightAction}</View>
    </View>
  );
}
