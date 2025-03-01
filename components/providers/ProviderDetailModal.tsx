// components/providers/ProviderDetailModal.tsx
import { Card, Title, Text } from "@tremor/react";
import { NetworkStats } from "@/types";
import { X } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";

interface ProviderDetailModalProps {
  provider: {
    provider: string;
    stats: any;
    reportCount: number;
  };
  stats: NetworkStats;
  onClose: () => void;
}

export default function ProviderDetailModal({
  provider,
  stats,
  onClose,
}: ProviderDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {provider.provider}
              </h2>
              <p className="text-gray-600 mt-1">
                Detailed Network Performance Analysis
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quality Stats */}
            <Card>
              <div className="space-y-4">
                <div>
                  <Text className="text-gray-600">Network Quality Score</Text>
                  <div className="text-3xl font-bold mt-1">
                    {provider.stats.avgQuality.toFixed(1)}/10
                  </div>
                </div>
                <ProgressBar
                  label="Quality Rating"
                  value={provider.stats.avgQuality}
                  maxValue={stats.MaxStats.maxQuality}
                  colorClass="bg-indigo-600"
                />
              </div>
            </Card>

            {/* Speed Stats */}
            <Card>
              <div className="space-y-4">
                <div>
                  <Text className="text-gray-600">Average Download Speed</Text>
                  <div className="text-3xl font-bold mt-1">
                    {(provider.stats.avgDownloadSpeed * 1000).toFixed(0)} Kbps
                  </div>
                </div>
                <ProgressBar
                  label="Speed Rating"
                  value={provider.stats.avgDownloadSpeed * 1000}
                  maxValue={stats.MaxStats.maxDownloadSpeed * 1000}
                  colorClass="bg-emerald-600"
                  suffix=" Kbps"
                />
              </div>
            </Card>

            {/* Upload Stats */}
            <Card>
              <div className="space-y-4">
                <div>
                  <Text className="text-gray-600">Average Upload Speed</Text>
                  <div className="text-3xl font-bold mt-1">
                    {(provider.stats.avgUploadSpeed * 1000).toFixed(0)} Kbps
                  </div>
                </div>
                <ProgressBar
                  label="Upload Rating"
                  value={provider.stats.avgUploadSpeed * 1000}
                  maxValue={stats.MaxStats.maxUploadSpeed * 1000}
                  colorClass="bg-pink-600"
                  suffix=" Kbps"
                />
              </div>
            </Card>

            {/* Sentiment Stats */}
            <Card>
              <div className="space-y-4">
                <div>
                  <Text className="text-gray-600">User Sentiment Score</Text>
                  <div className="text-3xl font-bold mt-1">
                    {provider.stats.avgSentiment.toFixed(2)}
                  </div>
                </div>
                <ProgressBar
                  label="Sentiment Rating"
                  value={provider.stats.avgSentiment}
                  maxValue={stats.MaxStats.maxSentiment}
                  colorClass="bg-amber-600"
                  format={(v) => v.toFixed(2)}
                />
              </div>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="mt-6">
            <Card>
              <Title>Additional Information</Title>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <Text className="text-gray-600">Total Reports</Text>
                  <div className="text-xl font-bold mt-1">
                    {provider.reportCount}
                  </div>
                </div>
                <div>
                  <Text className="text-gray-600">Market Share</Text>
                  <div className="text-xl font-bold mt-1">
                    {(
                      (provider.reportCount / stats.overallStats.totalReports) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
