import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number ke format Rupiah Indonesia
 * @param amount - Nominal dalam angka
 * @returns String format "Rp 50.000"
 */
export function formatCurrency(amount: number | string): string {
  const numAmount = typeof amount === "string" ? parseInt(amount.replace(/\./g, "")) : amount;
  if (isNaN(numAmount)) return "Rp 0";
  
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

/**
 * Format number dengan thousand separator (50.000)
 * @param value - Nominal dalam angka atau string
 * @returns String format "50.000"
 */
export function formatNumber(value: number | string): string {
  const numValue = typeof value === "string" ? parseInt(value.replace(/\./g, "")) : value;
  if (isNaN(numValue)) return "0";
  
  return new Intl.NumberFormat("id-ID").format(numValue);
}

/**
 * Parse formatted number ke integer
 * @param value - String format "50.000" atau "50000"
 * @returns Number (50000)
 */
export function parseNumber(value: string): number {
  return parseInt(value.replace(/\./g, "")) || 0;
}