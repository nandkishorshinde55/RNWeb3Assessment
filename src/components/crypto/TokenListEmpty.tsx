import React from "react";
import EmptyState from "@/components/common/EmptyState";

type TokenListEmptyProps = {
  search: string;
};

export default function TokenListEmpty({
  search,
}: TokenListEmptyProps) {
  return (
    <EmptyState
      title="No tokens found"
      message={
        search
          ? `No token found for "${search}".`
          : "Crypto list is empty."
      }
    />
  );
}