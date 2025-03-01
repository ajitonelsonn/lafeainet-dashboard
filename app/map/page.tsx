// app/map/page.tsx
"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { LocationReport } from "@/types";
import MapFilters from "@/components/MapFilters";
import LoadingScreen from "@/components/LoadingScreen";
import SignalMap from "@/components/signalmap";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function MapPage() {
  const [reports, setReports] = useState<LocationReport[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(
    async (filters?: { provider: string | null; timeRange: string }) => {
      try {
        const params = new URLSearchParams();
        if (filters?.provider) params.append("provider", filters.provider);
        if (filters?.timeRange) params.append("timeRange", filters.timeRange);

        const response = await fetch(`/api/location-reports?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        const formattedData = data.reports.map((report: any) => ({
          ...report,
          quality_score: Number(report.quality_score),
          sentiment_score: Number(report.sentiment_score),
          download_speed: Number(report.download_speed),
          latitude: Number(report.latitude),
          longitude: Number(report.longitude),
        }));
        setReports(formattedData);
        setProviders(data.providers);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <main className="min-h-screen pt-16 px-4">
      {loading && <LoadingScreen />}
      <MapFilters
        providers={providers}
        onFilterChange={fetchReports}
        defaultTimeRange="24h"
      />
      <div className="h-[calc(100vh-12rem)] relative">
        {loading ? null : error ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-red-500">{error}</div>
          </div>
        ) : reports.length > 0 ? (
          <>
            <MapWithNoSSR reports={reports} />
            {/* Legend */}
            <SignalMap />
          </>
        ) : (
          <div className="flex justify-center items-center h-full bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No data available for the selected filters
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
