import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [5, 159, 30, 41, 26, 58, 30],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' as const,
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [5, 159, 30, 41, 26, 58, 30],
    },
  ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false
  }

const MultitypeChart = () => {
  return <Chart type='bar' data={data} height={ 400 } width={ 400 } options={options}/>;
}

export default MultitypeChart
