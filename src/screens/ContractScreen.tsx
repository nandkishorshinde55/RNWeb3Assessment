import React, { useState } from "react";

import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";

import ContractValueCard from "@/components/contract/ContractValueCard";
import TransactionStatusCard from "@/components/contract/TransactionStatusCard";

import { useContract } from "@/hooks/useContract";
import { validatePositiveInteger } from "@/utils/validation";

export default function ContractScreen() {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string | undefined>();

  const {
    currentValue,
    loadingValue,
    transaction,
    readValue,
    updateValue,
    resetTransaction,
  } = useContract();

  const isSubmitting = [
    "validating",
    "preparing",
    "awaiting_signature",
    "broadcasting",
    "confirming",
  ].includes(transaction.status);

  const handleSubmit = async () => {
    const validationError = validatePositiveInteger(inputValue);

    if (validationError) {
      setInputError(validationError);
      return;
    }

    setInputError(undefined);

    await updateValue(Number(inputValue));
  };

  return (
    <AppScreen scrollable keyboardAvoiding>
      <AppText variant="title">
        Smart Contract
      </AppText>

      <AppText color="subText" className="mt-appSm">
        Read and update value on Ethereum Sepolia.
      </AppText>

      <ContractValueCard
        value={currentValue}
        loading={loadingValue}
        onRefresh={readValue}
      />

      <AppInput
        label="New Value"
        placeholder="Enter integer e.g. 4321"
        keyboardType="number-pad"
        value={inputValue}
        onChangeText={(value) => {
          setInputValue(value);
          setInputError(undefined);
        }}
        error={inputError}
        className="mt-appLg"
      />

      <AppButton
        title="Update Value"
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        className="mt-appLg"
      />

      <TransactionStatusCard
        transaction={transaction}
        onReset={resetTransaction}
      />
    </AppScreen>
  );
}