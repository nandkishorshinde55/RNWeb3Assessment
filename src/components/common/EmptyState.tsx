import React from "react";
import { View } from "react-native";

import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";
import { useTheme } from "@/hooks/useAppTheme";

type EmptyStateProps = {
  title: string;
  message?: string;
  actionTitle?: string;
  onActionPress?: () => void;
};

export default function EmptyState({
  title,
  message,
  actionTitle,
  onActionPress,
}: EmptyStateProps) {
  const { isDark } = useTheme();

  return (
    <View
      className={`flex-1 items-center justify-center px-appLg py-appXl ${
        isDark ? "bg-app-dark-background" : "bg-app-light-background"
      }`}
    >
      <View
        className={`w-full rounded-appXl border p-appXl ${
          isDark
            ? "bg-app-dark-surface border-app-dark-border"
            : "bg-app-light-surface border-app-light-border"
        }`}
      >
        <AppText variant="subtitle" center>
          {title}
        </AppText>

        {message ? (
          <AppText color="subText" center className="mt-appMd">
            {message}
          </AppText>
        ) : null}

        {actionTitle && onActionPress ? (
          <AppButton
            title={actionTitle}
            onPress={onActionPress}
            className="mt-appLg"
          />
        ) : null}
      </View>
    </View>
  );
}
