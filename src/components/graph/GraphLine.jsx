import React from "react";
import Chart from "react-apexcharts";

const GraphLine = ({graphData, graphYAxisMax}) => {

  if(!graphYAxisMax)
    graphYAxisMax = 1;

  const graphOptions = {
    options: {
      chart: {
        id: "TSP"
      },
      colors: ["#0AB6EC"],
      dataLabels: {
        enabled: graphData.length > 50 ? false : true,
        background: {
          enabled: true,
          foreColor: '#fff',
          borderRadius: 3,
          borderColor: '#0AB6EC'
        },
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Miles accumulated for each city visited",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#bec5d4", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.2
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: [0,1,2,3,4,5,6,7,8,9,10],
      },
      yaxis: {
        max: graphYAxisMax,
      }
    },
    series: [
      {
        name: "Series-1",
        data: graphData
      }
    ]
  };

  return (
    <div>
      <Chart options={graphOptions.options} series={graphOptions.series} type="line" width="800" />
    </div>
  );
};

export default GraphLine;
