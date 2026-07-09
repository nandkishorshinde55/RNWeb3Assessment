export const getBlockchainErrorMessage = (error: unknown): string => {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as any).code).toLowerCase()
      : "";

  if (
    code === "4001" ||
    message.includes("user rejected") ||
    message.includes("user denied")
  ) {
    return "You rejected the wallet request.";
  }

  if (
    message.includes("insufficient funds") ||
    message.includes("insufficient balance")
  ) {
    return "You do not have enough Sepolia ETH to pay gas fees.";
  }

  if (
    message.includes("network") ||
    message.includes("could not detect network")
  ) {
    return "Network issue. Please check your internet connection or Sepolia RPC.";
  }

  if (message.includes("timeout") || message.includes("request timed out")) {
    return "The request timed out. Please try again.";
  }

  if (message.includes("execution reverted") || message.includes("reverted")) {
    return "Smart contract execution failed.";
  }

  if (
    message.includes("call exception") ||
    message.includes("missing revert data")
  ) {
    return "Contract call failed. Please verify contract address, ABI, and network.";
  }

  if (message.includes("nonce") || message.includes("replacement fee")) {
    return "Transaction nonce issue. Please wait for your previous transaction to finish.";
  }

  return "Something went wrong while processing the transaction.";
};
