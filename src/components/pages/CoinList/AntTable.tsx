import { Table } from "antd";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import { IAntTableProps } from "../../../types/types";
import { roundPrice, roundToBillions } from "./services/ServiceFunctions";
import { Link } from "react-router-dom";
const PriceChangeRender = (props: any) => {
  return (
    <>
      {props.item > 0 ? (
        <RiseOutlined style={{ fontSize: "1.3rem", color: "green" }} />
      ) : (
        <FallOutlined style={{ fontSize: "1.3rem", color: "red" }} />
      )}
      <span style={props.item >= 0 ? { color: "green" } : { color: "red" }}>
        {props.item.toFixed(2)}%
      </span>
    </>
  );
};
const AntTable = (props: IAntTableProps) => {
  const { fetchedData, searchField, setSearchField } = props;
  const onInputChange = (e: any) => {
    setSearchField(e.target.value);
  };
  const dataSource = () => {
    return searchField === ""
      ? fetchedData
      : fetchedData.filter((coin: any) =>
          coin.name.toLowerCase().includes(searchField.toLowerCase())
        );
  };
  const columns: any = [
    {
      title: () => (
        <div className="table-title">
          Name {"  "}
          <input onChange={onInputChange} placeholder="Search" />
        </div>
      ),
      dataIndex: ["image", "name"],
      render: (t: any, r: any) => (
        <div className="table-col">
          <Link to={`/coins/${r.id}`} key={r.name}>
            <img style={{ width: "2rem" }} src={`${r.image}`} />
            <span style={{ paddingLeft: "10px", fontSize: "1.2rem" }}>
              {r.name}
            </span>
            <span>({r.symbol.toUpperCase()})</span>
          </Link>
        </div>
      ),
    },
    {
      title: "MarCap",
      dataIndex: "market_cap",
      responsive: ["md"],
      sorter: (a: any, b: any) => b.market_cap - a.market_cap,
      render: (item: number) => roundToBillions(item),
    },
    {
      title: "Vol24",
      dataIndex: "total_volume",
      responsive: ["lg"],
      sorter: (a: any, b: any) => b.total_volume - a.total_volume,
      render: (item: number) => roundToBillions(item),
    },
    {
      title: "Price",
      dataIndex: "current_price",
      sorter: (a: any, b: any) => b.current_price - a.current_price,
      render: (item: number) => roundPrice(item) + "$",
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h",
      sorter: (a: any, b: any) =>
        b.price_change_percentage_24h - a.price_change_percentage_24h,
      render: (item: number) => <PriceChangeRender item={item} />,
    },
  ];

  return (
    <Table
      loading={fetchedData.length ? false : true}
      columns={columns}
      sortDirections={["descend", "ascend"]}
      pagination={false}
      dataSource={dataSource()}
      rowKey="name"
    />
  );
};

export default AntTable;
