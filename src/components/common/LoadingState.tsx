import React from "react";
import { ActivityIndicator, View } from "react-native";
import AppText from "./AppText";

type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-appLg">
      <ActivityIndicator />

      <AppText color="subText" className="mt-appMd">
        {message}
      </AppText>
    </View>
  );
}