import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function getVariation(current: number, previous: number): { value: number; isPositive: boolean } {
  if (previous === 0) return { value: 0, isPositive: true };
  const variation = ((current - previous) / previous) * 100;
  return { value: Math.abs(variation), isPositive: variation >= 0 };
}

export function formatVariation(current: number, previous: number): string {
  const { value, isPositive } = getVariation(current, previous);
  return `${isPositive ? "+" : "-"}${value.toFixed(1)}%`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "connected": return "text-emerald-500";
    case "syncing": return "text-blue-500";
    case "error": return "text-red-500";
    case "disconnected": return "text-gray-400";
    default: return "text-gray-400";
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical": return "border-red-500 bg-red-50";
    case "warning": return "border-amber-500 bg-amber-50";
    case "success": return "border-emerald-500 bg-emerald-50";
    case "info": return "border-blue-500 bg-blue-50";
    default: return "border-gray-300 bg-gray-50";
  }
}

export function getSeverityIcon(severity: string): string {
  switch (severity) {
    case "critical": return "🔴";
    case "warning": return "🟡";
    case "success": return "🟢";
    case "info": return "🔵";
    default: return "⚪";
  }
}
