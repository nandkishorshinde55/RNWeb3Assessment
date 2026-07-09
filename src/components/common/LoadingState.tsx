import React from "react";
import { ActivityIndicator, View } from "react-native";

import AppText from "@/components/common/AppText";
import { useTheme } from "@/hooks/useAppTheme";

type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  const { isDark } = useTheme();

  return (
    <View
      className={`flex-1 items-center justify-center px-appLg ${
        isDark ? "bg-app-dark-background" : "bg-app-light-background"
      }`}
    >
      <ActivityIndicator size="large" color={isDark ? "#FFFFFF" : "#2563EB"} />

      <AppText variant="body" color="subText" center className="mt-appLg">
        {message}
      </AppText>
    </View>
  );
}
