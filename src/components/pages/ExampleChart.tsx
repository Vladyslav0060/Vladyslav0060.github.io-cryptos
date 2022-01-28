import { FC, useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
const ExampleChart: FC = () => {
  const chartRef: any = useRef();
  useEffect(() => {
    console.log(chartRef.current.clientWidth, chartRef.current.clientHeight);
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
    });
    const lineSeries = chart.addAreaSeries();
    lineSeries.setData([
      { time: "2019-04-11", value: 80.01 },
      { time: "2019-04-12", value: 96.63 },
      { time: "2019-04-13", value: 76.64 },
      { time: "2019-04-14", value: 81.89 },
      { time: "2019-04-15", value: 74.43 },
      { time: "2019-04-16", value: 80.01 },
      { time: "2019-04-17", value: 96.63 },
      { time: "2019-04-18", value: 76.64 },
      { time: "2019-04-19", value: 81.89 },
      { time: "2019-04-20", value: 74.43 },
    ]);
    chart.timeScale().fitContent();
  }, []);

  //   const chart = createChart(chartRef.current, { width: 400, height: 300 });
  //   const lineSeries = chart.addLineSeries();
  //   lineSeries.setData([
  //     { time: "2019-04-11", value: 80.01 },
  //     { time: "2019-04-12", value: 96.63 },
  //     { time: "2019-04-13", value: 76.64 },
  //     { time: "2019-04-14", value: 81.89 },
  //     { time: "2019-04-15", value: 74.43 },
  //     { time: "2019-04-16", value: 80.01 },
  //     { time: "2019-04-17", value: 96.63 },
  //     { time: "2019-04-18", value: 76.64 },
  //     { time: "2019-04-19", value: 81.89 },
  //     { time: "2019-04-20", value: 74.43 },
  //   ]);
  return (
    <div className="example-chart">
      <div className="example-chart-container" ref={chartRef}></div>
    </div>
  );
};

export default ExampleChart;
