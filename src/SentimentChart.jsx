import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SentimentChart = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: "Sentiment Score",
        data: data.map((entry) => entry.sentiment),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Mood Tracker</h2>
      <div className="chart">
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Index",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sentiment Score",
                },
              },
            },
          }}
          style={{ width: "100px", height: "10px" }}
        />
      </div>
    </div>
  );
};

export default SentimentChart;
