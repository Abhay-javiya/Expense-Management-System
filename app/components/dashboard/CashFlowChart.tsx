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
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRef, useEffect, useState } from 'react';
import { expenseChartData, expenseChartOptions } from '@/lib/charts';

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

export default function CashFlowChart() {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState(expenseChartData);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Create the gradient effect
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.4)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

    const newData = {
      ...expenseChartData,
      datasets: expenseChartData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: gradient,
      })),
    };

    setChartData(newData);
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Analytics</h3>
        <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1 focus:outline-none hover:bg-slate-100">
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="h-72 w-full">
        <Line ref={chartRef} options={expenseChartOptions} data={chartData} />
      </div>
    </div>
  );
}