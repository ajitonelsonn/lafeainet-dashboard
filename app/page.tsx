// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Network,
  Signal,
  Download,
  Activity,
  ThumbsUp,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import type { NetworkStats } from "@/types";
import ProviderCard from "@/components/providers/ProviderCard";
import ProviderDetailModal from "@/components/providers/ProviderDetailModal";
import { generateColors } from "@/utils/colors";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const timeRanges = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];

interface TrendProps {
  current: number;
  previous: number;
  suffix?: string;
  reversed?: boolean;
}

const TrendIndicator = ({
  current,
  previous,
  reversed = false,
}: TrendProps) => {
  const percentageChange = ((current - previous) / previous) * 100;
  const isPositive = reversed ? percentageChange < 0 : percentageChange > 0;
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
};

const prepareProviderData = (stats: NetworkStats | null) => {
  if (!stats?.providerStats) return [];

  const totalQuality = stats.providerStats.reduce(
    (acc, p) => acc + p.avgQuality,
    0
  );
  const totalSpeed = stats.providerStats.reduce(
    (acc, p) => acc + p.avgDownloadSpeed,
    0
  );

  return stats.providerStats.map((provider) => ({
    name: provider.providerName,
    quality: (provider.avgQuality / totalQuality) * 100,
    speed: (provider.avgDownloadSpeed / totalSpeed) * 100,
    rawQuality: provider.avgQuality,
    rawSpeed: provider.avgDownloadSpeed * 1000, // Convert to Kbps
    reportCount: provider.reportCount,
  }));
};

export default function Home() {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<{
    provider: string;
    stats: any;
    reportCount: number;
  } | null>(null);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats?range=${timeRange}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [timeRange]);

  const handleProviderClick = (provider: any) => {
    setSelectedProvider({
      provider: provider.providerName,
      stats: provider,
      reportCount: provider.reportCount,
    });
  };

  const closeProviderDetail = () => {
    setSelectedProvider(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const providerData = prepareProviderData(stats);
  const chartColors = generateColors(providerData.map((p) => p.name));

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          title: (items: any) => items[0]?.label || "",
        },
      },
    },
  };

  const qualityChartData = {
    labels: providerData.map((p) => p.name),
    datasets: [
      {
        data: providerData.map((p) => p.quality),
        backgroundColor: providerData.map((p) => chartColors[p.name]),
        borderWidth: 0,
      },
    ],
  };

  const speedChartData = {
    labels: providerData.map((p) => p.name),
    datasets: [
      {
        data: providerData.map((p) => p.speed),
        backgroundColor: providerData.map((p) => chartColors[p.name]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Network Analysis Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time network performance metrics across Timor-Leste
            </p>
            <p className="text-sm text-red-700">
              This project submit to{" "}
              <a
                href="https://lablab.ai/event/ai-for-connectivity-hackathon-building-resilient-networks"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-red-900"
              >
                AI for Connectivity Hackathon II: Building Resilient Networks
              </a>
            </p>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    timeRange === range.value
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-600" />
                <Text>Reports</Text>
              </div>
              {stats?.trends && (
                <TrendIndicator
                  current={stats.overallStats.totalReports}
                  previous={stats.trends.previousReports}
                />
              )}
            </div>
            <Text className="mt-2 text-2xl font-bold">
              {stats?.overallStats.totalReports}
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Signal className="h-5 w-5 text-emerald-600" />
                <Text>Quality</Text>
              </div>
              {stats?.trends && (
                <TrendIndicator
                  current={stats.overallStats.averageQuality}
                  previous={stats.trends.previousQuality}
                />
              )}
            </div>
            <Text className="mt-2 text-2xl font-bold">
              {stats?.overallStats.averageQuality.toFixed(1)}/10
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-violet-600" />
                <Text>Speed</Text>
              </div>
              {stats?.trends && (
                <TrendIndicator
                  current={stats.overallStats.averageDownloadSpeed}
                  previous={stats.trends.previousDownloadSpeed}
                />
              )}
            </div>
            <Text className="mt-2 text-2xl font-bold">
              {(stats?.overallStats.averageDownloadSpeed || 0).toFixed(3)} Mbps
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-pink-600" />
                <Text>Upload</Text>
              </div>
              {stats?.trends && (
                <TrendIndicator
                  current={stats.overallStats.averageUploadSpeed}
                  previous={stats.trends.previousUploadSpeed}
                />
              )}
            </div>
            <Text className="mt-2 text-2xl font-bold">
              {(stats?.overallStats.averageUploadSpeed || 0).toFixed(3)} Mbps
            </Text>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-amber-600" />
                <Text>Sentiment</Text>
              </div>
              {stats?.trends && (
                <TrendIndicator
                  current={stats.overallStats.averageSentiment}
                  previous={stats.trends.previousSentiment}
                />
              )}
            </div>
            <Text className="mt-2 text-2xl font-bold">
              {stats?.overallStats.averageSentiment.toFixed(2)}
            </Text>
          </Card>
        </div>

        {/* Provider Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <Title>Network Quality Distribution</Title>
            <div className="flex justify-center">
              <div className="h-80 mt-4">
                <Doughnut
                  data={qualityChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        ...chartOptions.plugins.tooltip,
                        callbacks: {
                          ...chartOptions.plugins.tooltip.callbacks,
                          label: (context: any) => {
                            const provider = providerData[context.dataIndex];
                            return `Quality: ${provider.rawQuality.toFixed(
                              1
                            )}/10`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Card>

          <Card>
            <Title>Network Speed Distribution</Title>
            <div className="flex justify-center">
              <div className="h-80 mt-4">
                <Doughnut
                  data={speedChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        ...chartOptions.plugins.tooltip,
                        callbacks: {
                          ...chartOptions.plugins.tooltip.callbacks,
                          label: (context: any) => {
                            const provider = providerData[context.dataIndex];
                            return `Speed: ${provider.rawSpeed.toFixed(
                              0
                            )} Kbps`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
        {/* Historical Trends */}
        {stats?.historicalData && (
          <Card className="w-full">
            <Title>Historical Performance</Title>
            <div className="w-full h-80 mt-4">
              <Line
                data={{
                  labels: stats.historicalData.dates,
                  datasets: [
                    {
                      label: "Quality Score",
                      data: stats.historicalData.quality,
                      borderColor: "#4338ca",
                      backgroundColor: "rgba(67, 56, 202, 0.1)",
                      fill: true,
                      tension: 0.4,
                      yAxisID: "y1",
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointBackgroundColor: "#4338ca",
                      borderWidth: 2,
                    },
                    {
                      label: "Download Speed (Mbps)",
                      data: stats.historicalData.speed,
                      borderColor: "#059669",
                      backgroundColor: "rgba(5, 150, 105, 0.1)",
                      fill: true,
                      tension: 0.4,
                      yAxisID: "y2",
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointBackgroundColor: "#059669",
                      borderWidth: 2,
                    },
                    {
                      label: "Sentiment Score",
                      data: stats.historicalData.sentiment,
                      borderColor: "#eab308",
                      backgroundColor: "rgba(234, 179, 8, 0.1)",
                      fill: true,
                      tension: 0.4,
                      yAxisID: "y3",
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointBackgroundColor: "#eab308",
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                    mode: "index",
                    intersect: false,
                  },
                  plugins: {
                    legend: {
                      position: "top" as const,
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                    tooltip: {
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      titleColor: "#1f2937",
                      bodyColor: "#4b5563",
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                      padding: 12,
                      boxPadding: 6,
                      usePointStyle: true,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.05)",
                      },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                      },
                      display: true,
                      title: {
                        display: true,
                        text: "Time",
                      },
                    },
                    y1: {
                      type: "linear" as const,
                      display: true,
                      position: "left" as const,
                      title: {
                        display: true,
                        text: "Quality Score",
                        color: "#4338ca",
                      },
                      grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                      },
                      ticks: {
                        callback: function (tickValue: number | string) {
                          return typeof tickValue === "number"
                            ? tickValue.toFixed(1)
                            : tickValue;
                        },
                      },
                      min: 0,
                      max: 10,
                    },
                    y2: {
                      type: "linear" as const,
                      display: true,
                      position: "right" as const,
                      title: {
                        display: true,
                        text: "Download Speed (Mbps)",
                        color: "#059669",
                      },
                      grid: {
                        display: false,
                      },
                      ticks: {
                        callback: function (tickValue: number | string) {
                          return typeof tickValue === "number"
                            ? tickValue.toFixed(2)
                            : tickValue;
                        },
                      },
                    },
                    y3: {
                      type: "linear" as const,
                      display: true,
                      position: "right" as const,
                      grid: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: "Sentiment Score",
                        color: "#eab308",
                      },
                      ticks: {
                        callback: function (tickValue: number | string) {
                          return typeof tickValue === "number"
                            ? tickValue.toFixed(2)
                            : tickValue;
                        },
                      },
                      min: -1,
                      max: 1,
                    },
                  },
                  layout: {
                    padding: {
                      left: 10,
                      right: 25, // Increased right padding to accommodate the third y-axis
                      top: 20,
                      bottom: 10,
                    },
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </Card>
        )}

        {/* Provider Performance Matrix */}
        <Card>
          <Title>Provider Performance Matrix</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {stats?.providerStats.map((provider) => (
              <ProviderCard
                key={provider.providerName}
                provider={provider}
                stats={stats}
                onClick={() => handleProviderClick(provider)}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Provider Detail Modal */}
      {selectedProvider && stats && (
        <ProviderDetailModal
          provider={selectedProvider}
          stats={stats}
          onClose={closeProviderDetail}
        />
      )}
    </main>
  );
}
