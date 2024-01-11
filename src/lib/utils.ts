import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Source: https://stackoverflow.com/a/59104590/
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

// unsure about `as unknown as number` workaround
export function throttle<Params extends any[]>(
  func: (...args: Params) => any,
  interval: number
): (...args: Params) => void {
  let lastExecutionTime: number | null = null;
  let timeout: number | null = null;

  return (...args: Params) => {
    const now = Date.now();

    if (lastExecutionTime && now - lastExecutionTime < interval) {
      clearTimeout(timeout as number);
      timeout = setTimeout(
        () => {
          lastExecutionTime = now;
          func(...args);
        },
        interval - (now - lastExecutionTime)
      ) as unknown as number;
    } else {
      lastExecutionTime = now;
      func(...args);
    }
  };
}
