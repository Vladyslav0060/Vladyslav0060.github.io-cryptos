import { FC, useEffect, useRef, useState, useContext, Dispatch } from "react";
import { createChart, ISeriesApi, CrosshairMode } from "lightweight-charts";
import { actionTypes } from "../../reducers/AppReducer";
import { AppContext } from "../../context/AppContext";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import Collapsible from "react-collapsible";
import { transform } from "typescript";
const cors = require("cors");
let candlesData: any = [];
// const periods = [m1, m5, m15, m30, h1, h2, h6, h12, d1];
const configMenu = styled.div`
  display: flex;
  flex-direction: row;
  height: "30px",
  background-color: "black",
  color: "white",
  text-align: "left",
`;
const TestChart: FC = () => {
  const {
    state: { symbols },
    dispatch,
  } = useContext(AppContext);
  // useEffect(() => {
  //   console.log(symbols);
  // }, [symbols]);
  const chart: any = useRef();
  const refContainer: any = useRef();
  const resizeObserver: any = useRef();
  const candlestickSeries: any = useRef();
  const volumesSeries: any = useRef();
  const [period, setPeriod] = useState("h1");
  const [symbol, setSymbol] = useState("bitcoin");
  const [isSymbolDropDown, setIsSymbolDropDown]: any = useState(false);
  const [symbolsList, setSymbolsList]: any = useState([]);
  const onPeriodsClick = (e: any) => {
    setPeriod(e.key);
    // fetchData();
  };
  const onSymbolClick = (symbol: any) => {
    setSymbol(symbol.target.innerHTML);
    // fetchData();
  };
  useEffect(() => {
    console.log(symbol);
  }, [symbol]);
  const getSymbols = async () => {
    const res: any = await axios({
      method: "get",
      url: "http://localhost:5000/coin/symbols",
    });

    console.log(res.data);
    setSymbolsList(res.data);
    return res.data;
  };
  useEffect(() => {
    getSymbols();
    chart.current = createChart(refContainer.current, {
      width: refContainer.current.clientWidth,
      height: refContainer.current.clientHeight,
      // width: refContainer.current.innerWidth,
      // height: refContainer.current.innerHeight,
      layout: {
        // backgroundColor: "#253248",
        backgroundColor: "#171a1e",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      rightPriceScale: {
        autoScale: true,
        scaleMargins: {
          top: 0.05,
          bottom: 0.15,
        },
      },
      grid: {
        vertLines: {
          color: "#1f2429",
        },
        horzLines: {
          color: "#1f2429",
        },
      },
      timeScale: {
        timeVisible: true,
        borderColor: "#485c7b",
        secondsVisible: false,
      },
    });
    chart.current.priceScale().applyOptions({ autoScale: true });
  }, []);
  const symbolsDropdownMenu = (
    // <Menu>
    //   {symbols.map((s) => (
    //     <Menu.Item key={s.id}>{s.symbol}</Menu.Item>
    //   ))}
    // </Menu>
    <Menu>
      {symbolsList.map((s: any) => (
        <Menu.Item key={s.id}>{s.symbol}</Menu.Item>
      ))}
    </Menu>
  );
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
  useEffect(() => {
    fetchData();
  }, [period, symbol]);
  const fetchData = async () => {
    console.log("FETCHDATA", symbol, period);
    const res: any = await axios({
      method: "get",
      url: "http://localhost:5000/coin/ohlc",
      params: {
        interval: period,
        baseId: symbol,
        quoteId: "tether",
      },
    });
    console.log(res);
    const { ohlcData, volumesData } = res.data;
    console.log(volumesData);
    candlestickSeries.current.setData([]);
    volumesSeries.current.setData([]);
    candlestickSeries.current.setData(ohlcData);
    volumesSeries.current.setData(volumesData);
  };
  useEffect(() => {
    candlestickSeries.current = chart.current.addCandlestickSeries({
      downColor: "#f6465d",
      upColor: "#0fca81",
      borderVisible: true,
    });
    volumesSeries.current = chart.current.addHistogramSeries({
      color: "#385263",
      borderVisible: true,
      lineWidth: 2,
      priceFormat: {
        type: "volume",
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
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
        height: "92.5vh",
        position: "relative",
        flexDirection: "column",
      }}
    >
      {/* <Collapsible trigger={"Config menu ▼"}>
        <div>hello</div>
      </Collapsible> */}
      <div
        style={{
          height: "25px",
          backgroundColor: "#171a1e",
          color: "white",
          textAlign: "left",
          // display: "flex",
          // flexDirection: "row",
          // columnGap: "15px",
        }}
      >
        <Dropdown overlay={periodsDropdownMenu} trigger={["click"]}>
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{
              color: "#7e8896",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Period: <span style={{ color: "#f0b922" }}>{period}</span>{" "}
            <DownOutlined />
          </a>
        </Dropdown>
        {/* <Dropdown overlay={symbolsDropdownMenu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Symbols <DownOutlined />
          </a>
        </Dropdown> */}
        <span onClick={() => setIsSymbolDropDown(!isSymbolDropDown)}>
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#7e8896" }}
          >
            Symbol: <span style={{ color: "#f0b922" }}>{symbol}</span>
            <DownOutlined />
          </a>
        </span>
        {/* <button
          onClick={() => {
            dispatch({
              type: actionTypes.ADD_SYMBOLS,
              payload: { id: "test", symbol: "testSymbol" },
            });
          }}
        >
          but
        </button> */}
        {isSymbolDropDown ? (
          <div
            style={{
              position: "relative",
              height: "204px",
              width: "420px",
              overflow: "auto",
              willChange: "transform",
              direction: "ltr",
              backgroundColor: "#171a1e",
              zIndex: "100",
              textAlign: "start",
              borderRadius: "5px",
            }}
            onMouseEnter={() => setIsSymbolDropDown(true)}
            onMouseLeave={() => setIsSymbolDropDown(false)}
          >
            {symbolsList.map((el: any) => (
              <div key={el.id} onClick={(e: any) => onSymbolClick(e)}>
                {el.id}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
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
