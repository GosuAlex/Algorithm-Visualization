import React from "react";
import Chart from "react-apexcharts";

const GraphKnapsack = React.memo(({graphData}) => {

  let knapsackSeries = []; 
  for(let iteration of graphData) {
    iteration.forEach((knapsack, index) => {
      if(!knapsackSeries[index])
        knapsackSeries[index] = [];
      knapsackSeries[index].push(knapsack);
    });
  }
  // eslint-disable-next-line
  knapsackSeries.map((serie, index) => {
    knapsackSeries[index] = {
      name: "Knapsack " + (index+1),
      data: serie
    }
  })

  const graphOptions = {
    options: {
      chart: {
        id: "Knapsack"
      },
      dataLabels: {
        enabled: graphData.length <= 20 ? true : false,
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
        text: "Knapsacks total value over iterations",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#bec5d4", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.2
        }
      },
      markers: {
        size: graphData.length <= 50 ? 4 : 0
      },
      xaxis: {
        title: {
          text: 'Iterations'
        }
      },
      yaxis: {
        // max: graphYAxisMax,
        // min: 0,
        forceNiceScale: Boolean,
        title: {
          text: 'Value'
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true,
      }
    },
    series: [
      // {
      //   name: "Knapsack Value",
      //   data: graphData
      // }
      ...knapsackSeries
    ]
  };

  return (
    <div>
      <Chart options={graphOptions.options} series={graphOptions.series} type="line" width="800" />
    </div>
  );
});

export default GraphKnapsack;
