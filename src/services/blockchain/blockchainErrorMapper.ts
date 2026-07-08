export const getBlockchainErrorMessage = (error: unknown) => {
  const message =
    error instanceof Error ? error.message.toLowerCase() : "";

  if (message.includes("user rejected")) {
    return "You rejected the transaction request.";
  }

  if (message.includes("insufficient funds")) {
    return "You do not have enough Sepolia ETH for gas fees.";
  }

  if (message.includes("network")) {
    return "Network error. Please check your internet or RPC connection.";
  }

  if (message.includes("timeout")) {
    return "The request timed out. Please try again.";
  }

  if (message.includes("execution reverted")) {
    return "Smart contract execution failed.";
  }

  if (message.includes("call exception")) {
    return "Contract call failed. Please verify ABI, contract address, and network.";
  }

  return "Something went wrong while interacting with the contract.";
};