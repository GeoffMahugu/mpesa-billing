import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function verifyResetToken(token) {
  // Placeholder implementation, actual logic may vary
  return token === process.env.RESET_TOKEN_SECRET;
}
