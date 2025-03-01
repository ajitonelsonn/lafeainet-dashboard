// app/map/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { LocationReport } from "@/types";
import MapFilters from "@/components/MapFilters";
import { Wifi } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

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
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
              <h3 className="font-semibold mb-2">Signal Quality</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Excellent (8-10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Good (6-8)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm">Fair (4-6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-red-500" />
                  <span className="text-sm">Poor (0-4)</span>
                </div>
              </div>
            </div>
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
