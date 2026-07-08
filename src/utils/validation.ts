export const validatePositiveInteger = (value: string) => {
  if (!value.trim()) {
    return "Please enter a value.";
  }

  const numberValue = Number(value);

  if (!Number.isInteger(numberValue)) {
    return "Only integer values are allowed.";
  }

  if (numberValue < 0) {
    return "Only positive integers are allowed.";
  }

  return null;
};