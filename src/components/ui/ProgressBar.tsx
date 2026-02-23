"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  color = "bg-brand-500",
  showLabel = true,
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const sizeClass = size === "sm" ? "h-1.5" : size === "md" ? "h-2.5" : "h-4";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex-1 bg-gray-100 rounded-full overflow-hidden", sizeClass)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-gray-600 min-w-[36px] text-right">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
}
