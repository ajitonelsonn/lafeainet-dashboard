// components/LoadingScreen.tsx
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <svg className="wifi-loader w-32 h-32" viewBox="0 0 100 100">
          <path
            className="wifi-arc animate-pulse-1"
            d="M10,50 a40,40 0 0,1 80,0"
          />
          <path
            className="wifi-arc animate-pulse-2"
            d="M20,50 a30,30 0 0,1 60,0"
          />
          <path
            className="wifi-arc animate-pulse-3"
            d="M30,50 a20,20 0 0,1 40,0"
          />
          <circle className="wifi-dot" cx="50" cy="50" r="4" />
        </svg>
        <style jsx>{`
          .wifi-loader {
            stroke: #3b82f6;
            stroke-width: 6;
            stroke-linecap: round;
            fill: none;
          }

          .wifi-dot {
            fill: #3b82f6;
          }

          .wifi-arc {
            opacity: 0;
          }

          @keyframes pulse {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .animate-pulse-1 {
            animation: pulse 2s infinite;
          }

          .animate-pulse-2 {
            animation: pulse 2s infinite;
            animation-delay: 0.3s;
          }

          .animate-pulse-3 {
            animation: pulse 2s infinite;
            animation-delay: 0.6s;
          }
        `}</style>
      </div>
      <p className="text-blue-600 text-lg font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}
