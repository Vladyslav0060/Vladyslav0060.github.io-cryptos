import Modal from "react-modal";
import { DeviceSize } from "../responsive";
import { useMediaQuery } from "react-responsive";
import { IContactMe } from "../../types/types";

const ContactMe: React.FC<IContactMe> = (props: IContactMe): any => {
  const closeModal = () => {
    props.setOpened((prevState) =>
      props.nModal === 1
        ? { ...prevState, first: !props.opened }
        : { ...prevState, second: !props.opened }
    );
  };
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000000a1",
      width: isMobile ? "300px" : "600px",
      border: 0,
    },
    overlay: { zIndex: 1000, backgroundColor: "#4c4c4cbf" },
  };
  const onSubmit = (e: any) => {
    const symbol = e.target.innerHTML.split(" ")[0].toLowerCase();
    console.log(symbol);
    props.symbols.forEach((el: any) => {
      if (el.symbol === symbol) {
        console.log("SUCCESS");
        props.setCurrentSymbol(el);
      }
    });
    props.setOpened((prevState) =>
      props.nModal === 1
        ? { ...prevState, first: !props.opened }
        : { ...prevState, second: !props.opened }
    );
  };
  return (
    <Modal
      isOpen={props.opened}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={closeModal}
    >
      <h2 className="modal-title">
        {props.nModal === 1 ? "From" : "To"}:
        <span>
          {" " + props.currentSymbol?.symbol.toUpperCase() + " / USDT"}
        </span>
      </h2>
      <div className="modal-exchange">
        {props.symbols?.map((el: any) => (
          <span onClick={onSubmit} className="modal-exchange-child" key={el.id}>
            {el.symbol.toUpperCase() + " / USDT"}
          </span>
        ))}
      </div>
    </Modal>
  );
};

export default ContactMe;
