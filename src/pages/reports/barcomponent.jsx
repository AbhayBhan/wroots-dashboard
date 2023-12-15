import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const BarComponent = ({ index,graphdata,statdata }) => {
  useEffect(() => {
    const BARCHART = new Chart(`bar${index}`, {
      type: "bar",
      data: graphdata,
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
  }, [graphdata]);

  return (
    <div className="w-auto h-auto flex flex-col gap-2 rounded-xl p-3 bg-white">
      <canvas id={`bar${index}`}></canvas>
      <div className="flex flex-col gap-1">
        <h1>Assigned : {statdata.assigned}</h1>
        <h1>Selected : {statdata.selected}</h1>
        <h1>offered : {statdata.offered}</h1>
        <h1>joined : {statdata.joined}</h1>
        <h1>Period Complete : {statdata.period_complete}</h1>
      </div>
    </div>
  );
};

export default BarComponent;
