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

export function formatDollarsWithoutCents(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDollarsWithCentsPrimitive(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDollarsWithCents(value: number): string {
  if (value === 0) return formatDollarsWithCentsPrimitive(value);
  if (value < 0.01) {
    return "<$0.01";
  }
  return formatDollarsWithCentsPrimitive(value);
}

export function formatNumberWithCommasNoDecimals(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

// Source: https://stackoverflow.com/a/8888498/
export function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
  var strTime = hours + ":" + minutesString + ampm;
  return strTime;
}

// Source: https://stackoverflow.com/a/15397495/9696311
export function appendOrdinalSuffixes(number: number) {
  if (number > 3 && number < 21) return number + "th";
  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
}

export function formatIsoAsDateWithTime(isoString: string) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const time = formatAMPM(date);
  return `${appendOrdinalSuffixes(day)} ${month} ${year} ${time}`;
}

export function formatIsoAsDateWithoutTime(isoString: string) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${appendOrdinalSuffixes(day)} ${month} ${year}`;
}
