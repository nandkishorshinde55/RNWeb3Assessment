import React from "react";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";
import AppButton from "@/components/common/AppButton";

type Props = {
  value: string;
  loading: boolean;
  onRefresh: () => void;
};

export default function ContractValueCard({
  value,
  loading,
  onRefresh,
}: Props) {
  return (
    <AppCard className="mt-appLg">
      <AppText variant="subtitle">Current Stored Value</AppText>

      <AppText variant="title" className="mt-appMd">
        {loading ? "Loading..." : value || "0"}
      </AppText>

      <AppButton
        title="Refresh Value"
        onPress={onRefresh}
        variant="outline"
        className="mt-appLg"
      />
    </AppCard>
  );
}