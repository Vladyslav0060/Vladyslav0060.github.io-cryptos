import { FC, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Modal from "../../exchange-components/Modal";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../responsive";
import { motion } from "framer-motion";
import FramerWrapper from "../../wrapper/FramerWrapper";
import DropdownButton from "./DropdownButton";
const Exchange: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  let isInitial = true;
  const [modalsOpened, setModalsOpened] = useState({
    first: false,
    second: false,
  });
  const [firstSymbol, setFirstSymbol]: any = useState();
  const [secondSymbol, setSecondSymbol]: any = useState();
  const [response, setResponse]: any = useState();
  const [amount, setAmount]: any = useState(1);
  const [isRotating, setIsRotating]: any = useState();
  const [isLoading, setIsLoading]: any = useState(true);

  const request = async () => {
    console.log("request");
    const result = await axios(
      "https://evening-island-58892.herokuapp.com/coin/assetsExchange"
    );
    if (result.status === 200) setIsLoading(false);
    setResponse(result.data);
    if (isInitial) {
      setFirstSymbol(result.data[0]);
      setSecondSymbol(result.data[1]);
    }
    isInitial = false;
  };
  useEffect(() => {
    const interval = setInterval(() => request(), 2000);
    return () => clearInterval(interval);
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
  };
  const switchCoins = () => {
    setIsRotating(true);
    const buf = firstSymbol;
    setFirstSymbol(secondSymbol);
    setSecondSymbol(buf);
    setTimeout(() => setIsRotating(false), 250);
  };
  const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };
  const inputAmountHandler = (e: any) => {
    if (parseFloat(e.target.value) >= 0) setAmount(e.target.value);
    else if (e.target.value === "") setAmount(0);
    return;
  };
  return (
    <FramerWrapper>
      <div className="exchange-wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          <motion.div transition={spring} animate={{ scale: 1.05 }}>
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
                <DropdownButton
                  symbol={firstSymbol}
                  modalsOpened={modalsOpened}
                  setModalsOpened={setModalsOpened}
                  isFirstSymbol={true}
                />
                <img src={firstSymbol?.image} />
              </div>
              <div className="exchange-col">
                <input
                  type="number"
                  onChange={inputAmountHandler}
                  value={amount}
                />
                <FontAwesomeIcon
                  className={isRotating ? "faSyncAlt-active" : "faSyncAlt"}
                  icon={faSyncAlt}
                  color="black"
                  onClick={switchCoins}
                />
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  value={roundNumber()}
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
                <DropdownButton
                  symbol={secondSymbol}
                  modalsOpened={modalsOpened}
                  setModalsOpened={setModalsOpened}
                  isFirstSymbol={false}
                />
                <img src={secondSymbol?.image} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </FramerWrapper>
  );
};
export default Exchange;
