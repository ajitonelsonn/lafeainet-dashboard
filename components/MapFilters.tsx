// components/MapFilters.tsx
import { useState, useEffect, useCallback, memo } from "react";

const timeRanges = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];

interface MapFiltersProps {
  providers: string[];
  defaultTimeRange: string;
  onFilterChange: (filters: {
    provider: string | null;
    timeRange: string;
  }) => void;
}

const MapFilters = memo(function MapFilters({
  providers,
  defaultTimeRange,
  onFilterChange,
}: MapFiltersProps) {
  const [provider, setProvider] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState(defaultTimeRange);

  const handleProviderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const newProvider = value === "all" ? null : value;
      setProvider(newProvider);
      onFilterChange({
        provider: newProvider,
        timeRange: selectedRange,
      });
    },
    [selectedRange, onFilterChange]
  );

  const handleTimeRangeChange = useCallback(
    (range: string) => {
      setSelectedRange(range);
      onFilterChange({
        provider,
        timeRange: range,
      });
    },
    [provider, onFilterChange]
  );

  // Only set initial filter once
  useEffect(() => {
    if (defaultTimeRange) {
      onFilterChange({
        provider: null,
        timeRange: defaultTimeRange,
      });
    }
  }, []); // Empty dependency array to run only once

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Provider
          </label>
          <select
            className="border rounded-md px-3 py-2 w-full sm:w-[200px]"
            onChange={handleProviderChange}
            value={provider || "all"}
          >
            <option value="all">All Providers</option>
            {providers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Time Range
          </label>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => handleTimeRangeChange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    selectedRange === range.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MapFilters;
