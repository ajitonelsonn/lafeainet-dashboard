// components/TrendIndicator.tsx
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendIndicatorProps {
  currentValue: number;
  previousValue: number;
  type: "positive" | "negative"; // higher is better or lower is better
}

export default function TrendIndicator({
  currentValue,
  previousValue,
  type,
}: TrendIndicatorProps) {
  const percentageChange =
    ((currentValue - previousValue) / previousValue) * 100;
  const isPositive =
    type === "positive" ? percentageChange > 0 : percentageChange < 0;
  const isNeutral = percentageChange === 0;

  return (
    <div
      className={`flex items-center gap-1 text-sm ${
        isNeutral
          ? "text-gray-500"
          : isPositive
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {isNeutral ? (
        <Minus className="h-4 w-4" />
      ) : isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      <span>{Math.abs(percentageChange).toFixed(1)}%</span>
    </div>
  );
}
