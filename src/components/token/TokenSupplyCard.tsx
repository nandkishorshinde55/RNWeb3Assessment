import React from "react";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";

import { TokenDetails } from "@/types/crypto";

type Props = {
  token: TokenDetails;
};

export default function TokenSupplyCard({
  token,
}: Props) {
  return (
    <AppCard className="mt-appLg mb-app2Xl">
      <AppText variant="subtitle">
        Supply
      </AppText>

      <AppText className="mt-appMd">
        Circulating Supply
      </AppText>

      <AppText color="subText">
        {token.market_data.circulating_supply.toLocaleString()}
      </AppText>

      <AppText className="mt-appLg">
        Total Supply
      </AppText>

      <AppText color="subText">
        {token.market_data.total_supply
          ? token.market_data.total_supply.toLocaleString()
          : "N/A"}
      </AppText>
    </AppCard>
  );
}