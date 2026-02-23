"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  variation?: { value: number; isPositive: boolean };
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  variation,
  icon: Icon,
  iconColor = "text-brand-600 bg-brand-50",
  className,
}: StatCardProps) {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconColor)}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-2 mt-2">
        {variation && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              variation.isPositive ? "text-emerald-600" : "text-red-500"
            )}
          >
            {variation.value === 0 ? (
              <Minus className="w-3 h-3" />
            ) : variation.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {variation.value.toFixed(1)}%
          </span>
        )}
        {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
      </div>
    </div>
  );
}
