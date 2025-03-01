// components/Map.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LocationReport } from "@/types";

const getQualityColor = (score: number) => {
  if (score >= 8) return "#22c55e"; // green-500
  if (score >= 6) return "#3b82f6"; // blue-500
  if (score >= 4) return "#eab308"; // yellow-500
  return "#ef4444"; // red-500
};

// Create custom WiFi icon function
const createWifiIcon = (quality: number) => {
  const color = getQualityColor(quality);

  return L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" class="wifi-icon">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="${color}"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="${color}"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="${color}"/>
      <path d="M12 20h.01" stroke="${color}"/>
    </svg>`,
    className: "custom-wifi-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapProps {
  reports: LocationReport[];
}

export default function Map({ reports }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView(
      [-8.874217, 125.727539],
      9
    );

    // Add tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(mapRef.current);

    // Add custom CSS for hover effect
    const style = document.createElement("style");
    style.textContent = `
      .custom-wifi-icon {
        transition: transform 0.2s ease-in-out;
      }
      .custom-wifi-icon:hover {
        transform: scale(1.2);
        cursor: pointer;
      }
      .custom-popup .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);

    // Add markers for each report
    reports.forEach((report) => {
      const marker = L.marker([report.latitude, report.longitude], {
        icon: createWifiIcon(report.quality_score),
      }).addTo(mapRef.current!);

      // Add popup with custom styling
      const popupContent = `
        <div class="p-4 min-w-[200px]">
          <h3 class="text-lg font-semibold mb-2">${report.provider}</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Quality:</span>
              <span class="font-medium">${report.quality_score.toFixed(
                1
              )}/10</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Speed:</span>
              <span class="font-medium">${report.download_speed.toFixed(
                3
              )} Mbps</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Sentiment:</span>
              <span class="font-medium">${report.sentiment_score.toFixed(
                2
              )}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: "custom-popup",
        maxWidth: 300,
      });
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [reports]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}
