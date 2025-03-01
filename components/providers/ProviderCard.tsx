// components/providers/ProviderCard.tsx
import { Text } from "@tremor/react";
import ProgressBar from "@/components/ui/ProgressBar";
import { NetworkStats } from "@/types";

interface ProviderCardProps {
  provider: any;
  stats: NetworkStats;
  onClick: () => void;
}

export default function ProviderCard({
  provider,
  stats,
  onClick,
}: ProviderCardProps) {
  return (
    <div
      className="bg-white p-6 rounded-xl border cursor-pointer transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <Text className="font-semibold text-lg mb-4">
        {provider.providerName}
      </Text>
      <div className="space-y-4">
        <ProgressBar
          label="Quality"
          value={provider.avgQuality}
          maxValue={stats.MaxStats.maxQuality}
          colorClass="bg-indigo-600"
        />
        <ProgressBar
          label="Speed"
          value={provider.avgDownloadSpeed * 1000}
          maxValue={stats.MaxStats.maxDownloadSpeed * 1000}
          colorClass="bg-emerald-600"
          suffix=" Kbps"
        />
        <ProgressBar
          label="Upload"
          value={provider.avgUploadSpeed * 1000}
          maxValue={stats.MaxStats.maxUploadSpeed * 1000}
          colorClass="bg-pink-600"
          suffix=" Kbps"
        />
        <ProgressBar
          label="Sentiment"
          value={provider.avgSentiment}
          maxValue={stats.MaxStats.maxSentiment}
          colorClass="bg-amber-600"
          format={(v) => v.toFixed(2)}
        />
        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Reports</span>
            <span className="text-sm font-semibold">
              {provider.reportCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
