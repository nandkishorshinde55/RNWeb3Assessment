import React from "react";
import { View } from "react-native";

import AppText from "@/components/common/AppText";
import { TRANSACTION_STEPS } from "@/constants/transaction";
import { TransactionStatus } from "@/types/transaction";

type Props = {
  currentStatus: TransactionStatus;
};

const getStepState = (
  stepIndex: number,
  currentIndex: number,
  isFailed: boolean
) => {
  if (isFailed) return "pending";
  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "active";
  return "pending";
};

export default function TransactionStepper({
  currentStatus,
}: Props) {
  if (currentStatus === "idle") return null;

  const isFailed = currentStatus === "failed";

  const currentIndex = TRANSACTION_STEPS.findIndex(
    (step) => step.key === currentStatus
  );

  return (
    <View className="mt-appLg">
      {TRANSACTION_STEPS.map((step, index) => {
        const state = getStepState(
          index,
          currentIndex,
          isFailed
        );

        const dotClass =
          state === "completed"
            ? "bg-app-success"
            : state === "active"
              ? "bg-app-primary"
              : "bg-app-light-border dark:bg-app-dark-border";

        const textColor =
          state === "completed" || state === "active"
            ? "text"
            : "subText";

        return (
          <View
            key={step.key}
            className="flex-row items-center mb-appMd"
          >
            <View
              className={`w-3 h-3 rounded-full mr-appMd ${dotClass}`}
            />

            <AppText color={textColor}>
              {step.label}
            </AppText>
          </View>
        );
      })}

      {isFailed ? (
        <AppText color="danger" className="mt-appSm">
          Transaction failed
        </AppText>
      ) : null}
    </View>
  );
}