import { useContext, useEffect, useState } from "react";
import Accessibility from "./accessibility";
import MenuToggle from "./menuToggle";
import { NavLink } from "react-router-dom";
import {
  faHome,
  faChartBar,
  faListAlt,
  faExchangeAlt,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../context/AppContext";
import { actionTypes } from "../../reducers/AppReducer";
import { NavLinksContainer, MobileLinksWrapper } from "./styled";

export function MobileNavLinks() {
  const {
    state: { isContactModalOpen },
    dispatch,
  } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "visible";
  }, [isOpen]);
  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <MobileLinksWrapper>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: "10px",
            }}
            className="mobile-links"
          >
            {/* <NavLink className="link-text" to="/home" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faHome}
                size="2x"
                color="white"
                style={{ width: "40px" }}
              />
              Home
            </NavLink> */}
            <NavLink className="link-text" to="/coins" onClick={clickHandler}>
              <FontAwesomeIcon icon={faListAlt} size="2x" color="white" />
              Coins
            </NavLink>
            <NavLink
              className="link-text"
              to="/exchange"
              onClick={clickHandler}
            >
              <FontAwesomeIcon icon={faExchangeAlt} size="2x" color="white" />
              Exchange
            </NavLink>
            <NavLink className="link-text" to="/charts" onClick={clickHandler}>
              <FontAwesomeIcon icon={faChartBar} size="2x" color="white" />
              Charts
            </NavLink>
            <section
              className="link-text"
              onClick={() => {
                clickHandler();
                dispatch({
                  type: actionTypes.SET_IS_CONTACT_MODAL_OPEN,
                  payload: !isContactModalOpen,
                });
              }}
            >
              <FontAwesomeIcon icon={faComment} size="2x" color="white" />
              <a href="#">Contact</a>
            </section>
            <div>
              <Accessibility setOpen={setOpen} />
            </div>
          </div>
        </MobileLinksWrapper>
      )}
    </NavLinksContainer>
  );
}
export default MobileNavLinks;
