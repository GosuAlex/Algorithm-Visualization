import React from "react";
import Chart from "react-apexcharts";

const GraphLine = React.memo(({graphData, graphYAxisMax, cityNames}) => {
  console.log(cityNames);
  if(!graphYAxisMax)
    graphYAxisMax = 1;

  const graphOptions = {
    options: {
      chart: {
        id: "TSP"
      },
      colors: ["#0AB6EC"],
      dataLabels: {
        enabled: graphData.length < 50 ? true : false,
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
        size: graphData.length < 50 ? 0 : 4
      },
      xaxis: {
        categories: cityNames
      },
      yaxis: {
        max: graphYAxisMax,
        min: 0,
        forceNiceScale: Boolean
      }
    },
    series: [
      {
        name: "Distance",
        data: graphData
      }
    ]
  };

  return (
    <div>
      <Chart options={graphOptions.options} series={graphOptions.series} type="line" width="800" />
    </div>
  );
});

export default GraphLine;
