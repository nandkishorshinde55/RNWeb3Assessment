import React from "react";
import { View } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-appXl">
      <AppText variant="subtitle" color="danger" center>
        {title}
      </AppText>

      <AppText color="subText" center className="mt-appSm">
        {message}
      </AppText>

      {onRetry ? (
        <AppButton
          title="Retry"
          onPress={onRetry}
          className="mt-appLg"
        />
      ) : null}
    </View>
  );
}