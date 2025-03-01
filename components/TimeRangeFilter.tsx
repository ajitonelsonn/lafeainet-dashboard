// components/TimeRangeFilter.tsx
import { useState } from "react";

const timeRanges = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];

export default function TimeRangeFilter({
  onRangeChange,
}: {
  onRangeChange: (range: string) => void;
}) {
  const [selectedRange, setSelectedRange] = useState("7d");

  const handleChange = (range: string) => {
    setSelectedRange(range);
    onRangeChange(range);
  };

  return (
    <div className="flex gap-2 mb-6">
      {timeRanges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleChange(range.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              selectedRange === range.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
