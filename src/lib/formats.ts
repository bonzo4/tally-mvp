export function convertDollarsToCents(dollars: number): string {
  const valueFormatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(dollars * 100);
  return `${valueFormatted}¢`;
}

export function convertNumberToDollars(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDollarsWithCents(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
