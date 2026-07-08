import React from "react";

import AppScreen from "@/components/common/AppScreen";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import AppText from "@/components/common/AppText";

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
    <AppScreen contentClassName="items-center justify-center">
      <AppCard className="w-full items-center">
        <AppText
          variant="title"
          color="danger"
          center
        >
          {title}
        </AppText>

        <AppText
          variant="body"
          color="subText"
          center
          className="mt-appMd"
        >
          {message}
        </AppText>

        {onRetry && (
          <AppButton
            title="Retry"
            onPress={onRetry}
            className="mt-appXl self-stretch"
          />
        )}
      </AppCard>
    </AppScreen>
  );
}