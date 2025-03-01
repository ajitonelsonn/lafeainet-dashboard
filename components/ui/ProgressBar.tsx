// components/ui/ProgressBar.tsx
interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  colorClass: string;
  suffix?: string;
  format?: (value: number) => string;
}

export default function ProgressBar({
  label,
  value,
  maxValue,
  colorClass,
  suffix = "",
  format = (v: number) => v.toFixed(1),
}: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium">
          {format(value)}
          {suffix}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all`}
          style={{ width: `${Math.min((value / maxValue) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
