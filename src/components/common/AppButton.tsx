import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import AppText from "./AppText";

type ButtonVariant = "primary" | "danger" | "outline" | "ghost";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}: AppButtonProps) {
  const isDisabled = loading || disabled;

  const variantClass: Record<ButtonVariant, string> = {
    primary: "bg-app-primary",
    danger: "bg-app-danger",
    outline: "bg-transparent border border-app-primary",
    ghost: "bg-transparent",
  };

  const textColor =
    variant === "outline" || variant === "ghost" ? "primary" : "white";

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      className={`h-12 rounded-appLg items-center justify-center px-appLg ${
        isDisabled ? "opacity-60" : "opacity-100"
      } ${variantClass[variant]} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <AppText variant="button" color={textColor}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}
