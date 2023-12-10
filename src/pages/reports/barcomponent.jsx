import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const BarComponent = ({ index,data }) => {
  useEffect(() => {
    const BARCHART = new Chart(`bar${index}`, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      BARCHART.destroy();
    };
  }, [data]);

  return (
    <div className="w-auto h-auto rounded-xl p-3 bg-white">
      <canvas id={`bar${index}`}></canvas>
    </div>
  );
};

export default BarComponent;
