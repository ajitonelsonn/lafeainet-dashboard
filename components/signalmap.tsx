import { Wifi } from "lucide-react";
export default function SignalMap() {
  return (
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
  );
}
