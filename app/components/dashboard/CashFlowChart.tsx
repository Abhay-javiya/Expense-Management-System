'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import { expenseChartOptions } from "@/lib/charts";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type CashFlowChartProps = {
  labels: string[];
  incomeSeries: number[];
  expenseSeries: number[];
};

export default function CashFlowChart({
  labels,
  incomeSeries,
  expenseSeries,
}: CashFlowChartProps) {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any>({
    labels,
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Create gradient effects
    const ctx = chart.ctx;
    const expenseGradient = ctx.createLinearGradient(0, 0, 0, 400);
    expenseGradient.addColorStop(0, "rgba(79, 70, 229, 0.3)");
    expenseGradient.addColorStop(1, "rgba(79, 70, 229, 0)");

    const incomeGradient = ctx.createLinearGradient(0, 0, 0, 400);
    incomeGradient.addColorStop(0, "rgba(16, 185, 129, 0.25)");
    incomeGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

    setChartData({
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeSeries,
          borderColor: "#10b981",
          backgroundColor: incomeGradient,
          borderWidth: 3,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#10b981",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Expenses",
          data: expenseSeries,
          borderColor: "#4f46e5",
          backgroundColor: expenseGradient,
          borderWidth: 3,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#4f46e5",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [labels, incomeSeries, expenseSeries]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-slate-800">Analytics</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Income
            </span>
            <span className="inline-flex items-center gap-1 text-indigo-600">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Expenses
            </span>
          </div>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1 focus:outline-none hover:bg-slate-100">
          <option>Last 6 Months</option>
        </select>
      </div>
      <div className="h-72 w-full">
        <Line ref={chartRef} options={expenseChartOptions} data={chartData} />
      </div>
    </div>
  );
}
