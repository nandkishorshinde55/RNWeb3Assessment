import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

import AppText from "./AppText";
import { useTheme } from "@/hooks/useAppTheme";

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  className?: string;
};

export default function AppInput({
  label,
  error,
  className = "",
  ...props
}: AppInputProps) {
  const { isDark } = useTheme();

  const inputClass = isDark
    ? "bg-app-dark-input border-app-dark-border text-app-dark-text"
    : "bg-app-light-input border-app-light-border text-app-light-text";

  return (
    <View className="w-full">
      {label && (
        <AppText variant="caption" color="subText" className="mb-appXs mt-2">
          {label}
        </AppText>
      )}

      <TextInput
        {...props}
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        className={`
          h-14
          rounded-appLg
          border
          px-appLg
          text-appBody
          ${inputClass}
          ${error ? "border-app-danger" : ""}
          ${className}
        `}
      />

      {error && (
        <AppText variant="caption" color="danger" className="mt-appXs">
          {error}
        </AppText>
      )}
    </View>
  );
}
