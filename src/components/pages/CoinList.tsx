import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Coin from "../Coin";
let firstName = "bitcoin",
  secondName = "ethereum";
let firstPrice = 0,
  secondPrice = 0;
const columns: any = [
  {
    title: "Name",
    dataIndex: ["image", "name"],
    sorter: (a: any, b: any) => b.name > a.name,
    render: (t: any, r: any) => (
      <div>
        <img style={{ width: "2rem" }} src={`${r.image}`} />
        <span style={{ marginLeft: "10px", fontSize: "1.2rem" }}>{r.name}</span>
        <span style={{ color: "grey" }}>({r.symbol.toUpperCase()})</span>
      </div>
    ),
  },
  {
    title: "MarCap",
    dataIndex: "market_cap",
  },
  {
    title: "Vol24",
    dataIndex: "total_volume",
  },
  {
    title: "Price",
    dataIndex: "current_price",
  },
  {
    title: "24h",
    dataIndex: "price_change_percentage_24h",
    render: (item: number) => (
      <>
        {item > 0 ? (
          <RiseOutlined style={{ fontSize: "1.3rem", color: "green" }} />
        ) : (
          <FallOutlined style={{ fontSize: "1.3rem", color: "red" }} />
        )}
        <span style={item >= 0 ? { color: "green" } : { color: "red" }}>
          {item.toFixed(2)}%
        </span>
      </>
    ),
  },
];

export interface ICoinRequest {
  id: string;
  name: string;
  symbol: string;
  total_volume: number;
  market_cap: number;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}
// let responseData: any[] = [];

const CoinList: FC = () => {
  const [fetchedData, setFetchedData] = useState<ICoinRequest[]>([]);
  useEffect(() => {
    request(process.env.REACT_APP_COINMARKET_URL);
  }, []);
  const request = async (url: string | undefined) => {
    if (url != undefined) {
      const response = await axios.get(url);
      console.log(response.data);
      response.data.map((item: ICoinRequest) => {
        if (item.id === firstName) firstPrice = item.current_price;
        else if (item.id === secondName) secondPrice = item.current_price;
      });
      if (firstPrice != 0 && secondPrice != 0)
        console.log("Result of converting: ", firstPrice / secondPrice);
      setFetchedData(response.data);
    }
  };
  {
    /* {fetchedData.map((item) => (
        <Coin key={item.id} item={item} />
      ))} */
  }
  return (
    <div style={{ marginLeft: "15%", marginRight: "15%", padding: "10px" }}>
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
      <Table
        columns={columns}
        dataSource={fetchedData}
        // onChange={onChange}
      />
      {/* </div> */}
    </div>
  );
};
export default CoinList;
