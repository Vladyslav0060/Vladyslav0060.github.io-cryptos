import { FC, useEffect, useRef, useState, useContext } from "react";
import { createChart, ISeriesApi, CrosshairMode } from "lightweight-charts";
import { actionTypes } from "../../reducers/AppReducer";
import { AppContext } from "../../context/AppContext";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import Collapsible from "react-collapsible";
const cors = require("cors");
let candlesData: any = [];
// const periods = [m1, m5, m15, m30, h1, h2, h6, h12, d1];
const TestChart: FC = () => {
  const {
    state: { symbols },
    dispatch,
  } = useContext(AppContext);
  console.log(symbols);
  // useEffect(() => {
  //   console.log(symbols);
  // }, [symbols]);
  const chart: any = useRef();
  const refContainer: any = useRef();
  const resizeObserver: any = useRef();
  const candlestickSeries: any = useRef();
  const [period, setPeriod] = useState("m5");
  const [symbol, setSymbol] = useState("bitcoin");
  const onPeriodsClick = (e: any) => {
    setPeriod(e.key);
  };
  const getSymbols = async () => {
    const res: any = await axios({
      method: "get",
      url: "http://localhost:5000/coin/symbols",
    });

    console.log(res.data);
    return res.data;
  };
  useEffect(() => {
    getSymbols();
  }, []);
  const periodsDropdownMenu = (
    <Menu onClick={onPeriodsClick}>
      <Menu.Item key="m1">1 min</Menu.Item>
      <Menu.Item key="m5">5 min</Menu.Item>
      <Menu.Item key="m15">15 min</Menu.Item>
      <Menu.Item key="m30">30 min</Menu.Item>
      <Menu.Item key="h1">1 hour</Menu.Item>
      <Menu.Item key="h2">2 hours</Menu.Item>
      <Menu.Item key="h6">6 hours</Menu.Item>
      <Menu.Item key="h12">12 hours</Menu.Item>
      <Menu.Item key="d1">1 day</Menu.Item>
    </Menu>
  );

  const fetchData = async () => {
    const res: any = await axios({
      method: "get",
      url: "http://localhost:5000/coin/ohlc",
      params: {
        interval: period,
        baseId: symbol,
        quoteId: "trueusd",
      },
    });
    const { ohlcData, volumesData } = res.data;
    candlestickSeries.current.setData(ohlcData);
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
      {/* <Collapsible trigger={"Config menu ▼"}>
        <div>hello</div>
      </Collapsible> */}
      <div
        style={{
          height: "30px",
          backgroundColor: "black",
          color: "white",
          textAlign: "left",
        }}
      >
        <Dropdown overlay={periodsDropdownMenu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Periods <DownOutlined />
          </a>
        </Dropdown>
        <button
          onClick={() => {
            dispatch({
              type: actionTypes.ADD_SYMBOLS,
              payload: { id: "test", symbol: "testSymbol" },
            });
          }}
        >
          but
        </button>
      </div>
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
