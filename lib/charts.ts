import { ChartData, ChartOptions } from 'chart.js';

export const expenseChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 12,
      cornerRadius: 8,
      titleFont: { size: 13 },
      bodyFont: { size: 14, weight: 'bold' },
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f1f5f9',
        tickBorderDash: [5, 5],
      },
      ticks: { color: '#94a3b8', font: { size: 11 } },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 12 } },
      border: { display: false },
    },
  },
};

export const expenseChartData: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Expenses',
      data: [420, 380, 500, 460, 520, 480],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)', // Simplified fallback
      borderWidth: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#4f46e5',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
    },
  ],
};
