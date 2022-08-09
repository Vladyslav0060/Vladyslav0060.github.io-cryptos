import Modal from "react-modal";
import { DeviceSize } from "../responsive";
import { useMediaQuery } from "react-responsive";
import { IContactMe } from "../../types/types";
import { useState, useEffect } from "react";

const ContactMe: React.FC<IContactMe> = (props: IContactMe): any => {
  const [search, setSearch] = useState<string>("");
  const [filteredList, setFilteredList] = useState<[]>(props.symbols);
  const onChange = (e: any) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search === "") setFilteredList(props.symbols);
    const filtered = props?.symbols?.filter((item: any) => {
      return item.symbol.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredList(filtered);
  }, [search, props.symbols]);
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
      height: "500px",
      border: 0,
    },
    overlay: { zIndex: 1000, backgroundColor: "#4c4c4cbf" },
  };
  const onSubmit = (e: any) => {
    const symbol = e.target.innerHTML.split(" ")[0].toLowerCase();
    props.symbols.forEach((el: any) => {
      if (el.symbol === symbol) {
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
      <div className="modal-title">
        <input
          className="modal-search"
          value={search}
          type="text"
          onChange={onChange}
          placeholder="Search"
        />
      </div>
      <div className="modal-exchange">
        {filteredList?.map((el: any) => (
          <span onClick={onSubmit} className="modal-exchange-child" key={el.id}>
            {el.symbol.toUpperCase() + " / USDT"}
          </span>
        ))}
      </div>
    </Modal>
  );
};

export default ContactMe;
