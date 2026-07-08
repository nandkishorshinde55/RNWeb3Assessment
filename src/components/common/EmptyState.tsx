import React from "react";
import { View } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";

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
  return (
    <View className="items-center justify-center p-appXl">
      <AppText variant="subtitle" center>
        {title}
      </AppText>

      {message ? (
        <AppText color="subText" center className="mt-appSm">
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
  );
}