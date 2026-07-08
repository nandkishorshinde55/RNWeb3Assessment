export const formatAddress = (address?: string | null) => {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatEthBalance = (balance: string | number) => {
  const value = Number(balance);

  if (Number.isNaN(value)) return "0";

  return value.toFixed(5);
};