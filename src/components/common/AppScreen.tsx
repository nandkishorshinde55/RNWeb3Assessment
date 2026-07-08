import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useAppTheme";

type AppScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  className?: string;
  contentClassName?: string;
};

export default function AppScreen({
  children,
  scrollable = false,
  keyboardAvoiding = false,
  className = "",
  contentClassName = "",
}: AppScreenProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const bgClass = isDark
    ? "bg-app-dark-background"
    : "bg-app-light-background";

  const content = scrollable ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName={`px-appLg py-appLg ${contentClassName}`}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 px-appLg py-appLg ${contentClassName}`}>
      {children}
    </View>
  );

  return (
    <View
      className={`flex-1 ${bgClass} ${className}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
}