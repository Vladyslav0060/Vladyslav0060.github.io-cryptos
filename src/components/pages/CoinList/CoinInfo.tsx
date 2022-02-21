import { BrowserRouter as Router, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { TwitterOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import FramerWrapper from "../../wrapper/FramerWrapper";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antLoadingIcon = <LoadingOutlined style={{ color: "white" }} spin />;
const CoinInfo = () => {
  const { id } = useParams();
  const [data, setData]: any = useState();
  const fetchData = async () => {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
      {
        params: { slug: id },
        headers: {
          "X-CMC_PRO_API_KEY": "597579ac-3dce-4c0a-8c29-863686119e3d",
        },
      }
    );
    setData(response.data.data[Object.keys(response.data.data)[0]]);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <FramerWrapper>
      <div className="details-wrapper">
        <div className="details">
          {data?.name ? (
            <>
              <h1>CoinInfo page</h1>
              <div className="title">
                <div className="col">
                  <img src={data?.logo} alt="" />
                  <span>{data?.name}</span>
                </div>
                <div className="col">
                  <span>
                    <h3>Contract addresses</h3>
                    {!data?.contract_address
                      ? ""
                      : !data?.contract_address.length
                      ? "Not found!"
                      : data?.contract_address.map((el: any) => (
                          <div>
                            <span>
                              {console.log(el.contract_address.length)}
                              {el.contract_address}
                            </span>
                          </div>
                        ))}
                  </span>
                </div>
              </div>
              <div className="description">
                <h1>What is {data?.name}?</h1>
                <p>{data?.description}</p>
                <a
                  href={`https://twitter.com/${data?.twitter_username}`}
                  target="_blank"
                >
                  <TwitterOutlined
                    style={{ color: "#3aaff5", paddingRight: "5px" }}
                  />
                  twitter:{" "}
                  {data?.twitter_username ? data?.twitter_username : "-"}{" "}
                </a>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" indicator={antLoadingIcon} />
            </div>
          )}
        </div>
      </div>
    </FramerWrapper>
  );
};

export default CoinInfo;
