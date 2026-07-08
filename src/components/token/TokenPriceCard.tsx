import React from "react";

import AppCard from "@/components/common/AppCard";
import AppText from "@/components/common/AppText";

import { TokenDetails } from "@/types/crypto";

import {
  formatCurrency,
  formatCompactCurrency,
  formatPercentage,
} from "@/utils/format";

type Props = {
  token: TokenDetails;
};

export default function TokenPriceCard({
  token,
}: Props) {
  return (
    <AppCard className="mt-appLg">
      <AppText variant="subtitle">
        Market Information
      </AppText>

      <AppText className="mt-appMd">
        Price:{" "}
        {formatCurrency(
          token.market_data.current_price.usd
        )}
      </AppText>

      <AppText className="mt-appSm">
        Market Cap:{" "}
        {formatCompactCurrency(
          token.market_data.market_cap.usd
        )}
      </AppText>

      <AppText className="mt-appSm">
        24h High:{" "}
        {formatCurrency(
          token.market_data.high_24h.usd
        )}
      </AppText>

      <AppText className="mt-appSm">
        24h Low:{" "}
        {formatCurrency(
          token.market_data.low_24h.usd
        )}
      </AppText>

      <AppText className="mt-appSm">
        24h Change:{" "}
        {formatPercentage(
          token.market_data
            .price_change_percentage_24h
        )}
      </AppText>
    </AppCard>
  );
}