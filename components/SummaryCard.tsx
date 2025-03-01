// components/SummaryCard.tsx
import { Card, Text } from "@tremor/react";
import TrendIndicator from "./TrendIndicator";

interface SummaryCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  trendType: "positive" | "negative";
  suffix?: string;
}

export default function SummaryCard({
  title,
  value,
  previousValue,
  icon,
  trendType,
  suffix = "",
}: SummaryCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <Text>{title}</Text>
        </div>
        <TrendIndicator
          currentValue={value}
          previousValue={previousValue}
          type={trendType}
        />
      </div>
      <Text className="mt-2 text-2xl font-bold">
        {value.toFixed(2)}
        {suffix}
      </Text>
    </Card>
  );
}
