export const formatAddress = (address?: string | null) => {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatEthBalance = (balance: string | number) => {
  const value = Number(balance);

  if (Number.isNaN(value)) return "0";

  return value.toFixed(5);
};

export const formatCurrency = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

export const formatCompactCurrency = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "0.00%";
  }

  return `${value.toFixed(2)}%`;
};