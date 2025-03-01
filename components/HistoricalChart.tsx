// components/HistoricalChart.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Add to your NetworkStats type
interface HistoricalData {
  dates: string[];
  values: number[];
}

interface HistoricalChartProps {
  data: HistoricalData;
  title: string;
  color: string;
}

export default function HistoricalChart({
  data,
  title,
  color,
}: HistoricalChartProps) {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: color,
        backgroundColor: color,
        tension: 0.4,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}
