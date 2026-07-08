import React from "react";
import { Pressable } from "react-native";

import AppText from "@/components/common/AppText";

type IconButtonProps = {
  label: string;
  onPress: () => void;
  className?: string;
};

export default function IconButton({
  label,
  onPress,
  className = "",
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-10 h-10 rounded-appPill items-center justify-center bg-app-primary ${className}`}
    >
      <AppText color="white">{label}</AppText>
    </Pressable>
  );
}
