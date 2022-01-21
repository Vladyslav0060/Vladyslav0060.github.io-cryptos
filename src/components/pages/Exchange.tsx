import { FC, useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { Dropdown, Menu } from "antd";
import Modal from "../exchange-components/Modal";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// let [symbols, setSymbols]: any = [];

const Exchange: FC = () => {
  let isInitial = true;
  let [symbolDropdownMenu, setSymbolDropdownMenu]: any = useState();
  const [modalsOpened, setModalsOpened] = useState({
    first: false,
    second: false,
  });
  const [firstSymbol, setFirstSymbol]: any = useState();
  const [secondSymbol, setSecondSymbol]: any = useState();
  const [response, setResponse]: any = useState();
  const [symbols, setSymbols]: any = useState();
  const [amount, setAmount]: any = useState(1);
  const [isRotating, setIsRotating]: any = useState();
  const onSymbolsClick = (e: any) => {
    console.log(e);
  };
  useEffect(() => {
    console.log("ENTERED", symbols);
    setSymbolDropdownMenu(
      <Menu
        style={{
          height: "400px",
          overflowY: "scroll",
          width: "300px",
          columns: "5",
        }}
        onClick={onSymbolsClick}
      >
        {symbols?.map((el: any) => (
          <Menu.Item key={el}>{el}</Menu.Item>
        ))}
      </Menu>
    );
  }, [symbols]);

  const request = async () => {
    if (isInitial) {
      const result = await axios("http://localhost:5000/coin/assetsExchange");
      setResponse(result.data);
      console.log(result.data);
      setFirstSymbol(result.data[0]);
      setSecondSymbol(result.data[1]);
      const temp = result?.data?.map((el: any) => el.symbol);
      setSymbols(temp);
    }
    isInitial = false;
  };
  useEffect(() => {
    request();
  }, []);
  useEffect(() => {
    if (firstSymbol === undefined || secondSymbol === undefined) return;
    console.log(firstSymbol);
    console.log(firstSymbol?.price / secondSymbol?.price);
  }, [firstSymbol, secondSymbol]);
  const roundNumber = () => {
    let testNum = (amount * firstSymbol?.price) / secondSymbol?.price;
    const firstpart = testNum.toString().split(".")[0];
    console.log("FP", firstpart[0]);
    switch (firstpart[0]) {
      case "0":
        return ((amount * firstSymbol?.price) / secondSymbol?.price).toFixed(7);
      default:
        return ((amount * firstSymbol?.price) / secondSymbol?.price).toFixed(3);
    }
    return (amount * firstSymbol?.price) / secondSymbol?.price;
  };
  const switchCoins = () => {
    setIsRotating(true);
    const buf = firstSymbol;
    setFirstSymbol(secondSymbol);
    setSecondSymbol(buf);
    setTimeout(() => setIsRotating(false), 250);
  };
  return (
    <div className="exchange-wrapper">
      <div className="exchange-form">
        <div className="exchange-col">
          <Modal
            opened={modalsOpened.first}
            setOpened={setModalsOpened}
            nModal={1}
            symbols={response}
            currentSymbol={firstSymbol}
            setCurrentSymbol={setFirstSymbol}
          />
          <button
            onClick={() =>
              setModalsOpened((prevState) => ({
                ...prevState,
                first: !modalsOpened.first,
              }))
            }
          >
            {firstSymbol?.id.toUpperCase() +
              "(" +
              firstSymbol?.symbol.toUpperCase() +
              ") ▼"}
          </button>
          <img
            src={firstSymbol?.image}
            style={{ width: "15vw", height: "15vw" }}
          />
          {/* -------------------------------------------- */}
        </div>
        <div className="exchange-col">
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            style={{ width: "50%", color: "white" }}
          />
          <FontAwesomeIcon
            className={isRotating ? "faSyncAlt-active" : "faSyncAlt"}
            icon={faSyncAlt}
            size="6x"
            color="black"
            onClick={switchCoins}
            style={{ width: "15vw", cursor: "pointer" }}
          />
          {/* <h1>{(amount * firstSymbol?.price) / secondSymbol?.price}</h1> */}
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={roundNumber()}
            style={{ width: "50%", color: "white" }}
          />
        </div>
        <div className="exchange-col">
          <Modal
            opened={modalsOpened.second}
            setOpened={setModalsOpened}
            nModal={2}
            symbols={response}
            currentSymbol={secondSymbol}
            setCurrentSymbol={setSecondSymbol}
          />
          <button
            onClick={() =>
              setModalsOpened((prevState) => ({
                ...prevState,
                second: !modalsOpened.second,
              }))
            }
          >
            {secondSymbol?.id.toUpperCase() +
              "(" +
              secondSymbol?.symbol.toUpperCase() +
              ") ▼"}
          </button>
          <img
            src={secondSymbol?.image}
            style={{ width: "15vw", height: "15vw" }}
          />
        </div>
      </div>
    </div>
  );
};
export default Exchange;
