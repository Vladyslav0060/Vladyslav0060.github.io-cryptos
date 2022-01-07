import { FC, useEffect, useRef, useState } from "react";
import { createChart, ISeriesApi, CrosshairMode } from "lightweight-charts";
import axios from "axios";
import Collapsible from "react-collapsible";
const cors = require("cors");
let candlesData: any = [];
const TestChart: FC = () => {
  // let chart: ISeriesApi<"Area"> = {};
  // let chart: any;
  const chart: any = useRef();
  const refContainer: any = useRef();
  const resizeObserver: any = useRef();
  const candlestickSeries: any = useRef();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fetchData = async () => {
    const response: any = await axios({
      method: "get",
      url: "https://api.coincap.io/v2/candles?exchange=poloniex&interval=m15&baseId=bitcoin&quoteId=trueusd",
      params: {
        Autorization: "Bearer c01e24fe-4a5e-4f7c-b2e1-aaf157181e11 ",
      },
    });
    response.data.data.forEach((el: any) => {
      candlesData.push({
        time: parseInt(el["period"].toString().slice(0, -3)),
        close: el["close"],
        high: el["high"],
        low: el["low"],
        open: el["open"],
      });
    });
    candlestickSeries.current.setData(candlesData);
  };
  useEffect(() => {
    chart.current = createChart(refContainer.current, {
      width: refContainer.current.clientWidth,
      height: refContainer.current.clientHeight,
      // width: refContainer.current.innerWidth,
      // height: refContainer.current.innerHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      rightPriceScale: {
        autoScale: true,
        scaleMargins: {
          top: 0.05,
          bottom: 0.05,
        },
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      timeScale: {
        timeVisible: true,
        borderColor: "#485c7b",
        secondsVisible: false,
      },
    });
    candlestickSeries.current = chart.current.addCandlestickSeries();
    // const candlestickSeries = chart.addCandlestickSeries();
    fetchData();
  }, []);
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({
        width: width,
        height: height,
      });
    });

    resizeObserver.current.observe(refContainer.current);

    return () => resizeObserver.current.disconnect();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: "93.5vh",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Collapsible trigger={"Config menu ▼"}>
        <div>hello</div>
      </Collapsible>
      <div
        ref={refContainer}
        style={{
          minHeight: "500px",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        // style={{
        //   height: "100%",
        //   maxHeight: "99.99%",
        //   width: "100%",
        //   minHeight: "70vh",
        //   zIndex: "0",
        // }}
      />
    </div>
  );
};
export default TestChart;
