import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ data, title, color = '#16a34a' }) => {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: title,
        data: data.map(item => item.value),
        borderColor: color,
        backgroundColor: `${color}20`,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ProgressChart;