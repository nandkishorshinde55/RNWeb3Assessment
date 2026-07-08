import React, { useState } from "react";
import { Alert } from "react-native";

import AppScreen from "@/components/common/AppScreen";
import AppText from "@/components/common/AppText";
import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";

import ContractValueCard from "@/components/contract/ContractValueCard";
import TransactionStatusCard from "@/components/contract/TransactionStatusCard";

import { useContract } from "@/hooks/useContract";

export default function ContractScreen() {
  const [inputValue, setInputValue] = useState("");

  const {
    currentValue,
    loadingValue,
    transaction,
    readValue,
    updateValue,
  } = useContract();

  const isSubmitting =
    transaction.status === "preparing" ||
    transaction.status === "awaiting_signature" ||
    transaction.status === "broadcasting" ||
    transaction.status === "confirming";

  const handleSubmit = async () => {
    const numberValue = Number(inputValue);

    if (!inputValue.trim()) {
      Alert.alert("Invalid Input", "Please enter an integer value.");
      return;
    }

    if (!Number.isInteger(numberValue) || numberValue < 0) {
      Alert.alert("Invalid Input", "Only positive integers are allowed.");
      return;
    }

    await updateValue(numberValue);
  };

  return (
    <AppScreen scrollable keyboardAvoiding>
      <AppText variant="title">Smart Contract</AppText>

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
        onChangeText={setInputValue}
        className="mt-appLg"
      />

      <AppButton
        title="Update Value"
        onPress={handleSubmit}
        loading={isSubmitting}
        className="mt-appLg"
      />

      <TransactionStatusCard transaction={transaction} />
    </AppScreen>
  );
}