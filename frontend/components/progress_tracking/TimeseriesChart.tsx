/**
 * Line chart used to display PHQ/GAD scores in patient portal
 */
import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

interface Props {
  label: string;
  data: Array<{ timestamp: number | string; value: number }>;
  minValue?: number;
  maxValue?: number;
}

const TimeseriesChart: React.FC<Props> = ({
  label,
  minValue = 0,
  maxValue,
  data,
}) => {
  const formattedData = data.map((d) => ({
    x: new Date(d.timestamp).toLocaleDateString(),
    y: d.value,
  }));
  const chartData = {
    datasets: [
      {
        label,
        data: formattedData,
        fill: false,
        backgroundColor: "#ff877a",
        borderColor: "rgba(255, 135, 122, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        min: minValue,
        max: maxValue,
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value: number) => {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
      },
    },
  };

  return <Line type="line" data={chartData} options={options} />;
};

export default TimeseriesChart;
