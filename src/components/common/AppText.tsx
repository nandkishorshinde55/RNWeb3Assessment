import React from "react";
import { Text, TextProps } from "react-native";
import { useThemeStore } from "@/store/themeStore";

type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "bodyMedium"
  | "caption"
  | "button";

type TextColor =
  | "text"
  | "subText"
  | "mutedText"
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "white";

type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: TextColor;
  center?: boolean;
  className?: string;
};

export default function AppText({
  children,
  variant = "body",
  color = "text",
  center = false,
  className = "",
  ...props
}: AppTextProps) {
  const { isDark } = useThemeStore();

  const variantClass: Record<TextVariant, string> = {
    title: "text-appTitle font-bold",
    subtitle: "text-appSubtitle font-semibold",
    body: "text-appBody font-normal",
    bodyMedium: "text-appBody font-semibold",
    caption: "text-appCaption font-normal",
    button: "text-appBody font-bold",
  };

  const colorClass: Record<TextColor, string> = {
    text: isDark ? "text-app-dark-text" : "text-app-light-text",
    subText: isDark ? "text-app-dark-subText" : "text-app-light-subText",
    mutedText: isDark
      ? "text-app-dark-mutedText"
      : "text-app-light-mutedText",
    primary: "text-app-primary",
    success: "text-app-success",
    danger: "text-app-danger",
    warning: "text-app-warning",
    white: "text-white",
  };

  return (
    <Text
      {...props}
      className={`${variantClass[variant]} ${colorClass[color]} ${
        center ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </Text>
  );
}