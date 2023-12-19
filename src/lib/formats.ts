
export function convertDollarsToCents(dollars: number): string {
  const valueFormatted = new Intl.NumberFormat('en-US', { 
      maximumFractionDigits: 0, 
  }).format(dollars * 100)
  return `${valueFormatted}¢`
}
