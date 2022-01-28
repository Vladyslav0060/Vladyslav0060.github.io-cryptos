import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import { Accessibility } from "./accessibility";
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
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../responsive";
import { AppContext } from "../../context/AppContext";
import { actionTypes } from "../../reducers/AppReducer";
const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.div`
  // display: flex;
  // height: 100%;
  // list-style: none;
  // background-color: #000;
  // width: 100%;
  // flex-direction: column;
  // position: fixed;
  // top: 60px;
  // left: 0;
  // z-index: 100;
  // align-items: inherit;
  // justify-content: flex-start;
  // padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  background-color: #000;
  height: 100vh;
  width: 100vw;
  top: 60px;
  left: 0px;
  z-index: 200;
`;

const LinkItem = styled.div`
  color: white;
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  margin-bottom: 10px;
`;

// const NavLink = styled.a`
//   text-decoration: none;
//   color: inherit;
//   font-size: inherit;
// `;

export function MobileNavLinks() {
  const {
    state: { isContactModalOpen },
    dispatch,
  } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
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
        <LinksWrapper>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: "10px",
              // margin: "0 0 15px 60vw",
            }}
          >
            <NavLink className="link-text" to="/home" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faHome}
                size="2x"
                color="white"
                style={{ width: "40px" }}
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Home
            </NavLink>

            <NavLink
              className="link-text"
              to="/exchange"
              onClick={clickHandler}
            >
              <FontAwesomeIcon
                icon={faExchangeAlt}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Exchange
            </NavLink>

            <NavLink className="link-text" to="/coins" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faListAlt}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Coins
            </NavLink>

            <NavLink className="link-text" to="/charts" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faChartBar}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Charts
            </NavLink>
            <section
              // style={{
              //   fontSize: "20px",
              //   display: "flex",
              //   alignItems: "center",
              //   width: "100%",
              //   marginLeft: "33vw",
              //   padding: "0 33% 3px 10px",
              // }}
              className="link-text"
              onClick={() => {
                clickHandler();
                dispatch({
                  type: actionTypes.SET_IS_CONTACT_MODAL_OPEN,
                  payload: !isContactModalOpen,
                });
              }}
            >
              <FontAwesomeIcon
                icon={faComment}
                size="2x"
                color="white"
                // style={{ width: "10vw", cursor: "pointer" }}
              />
              <span>Contact</span>
            </section>
            <div>
              <Accessibility setOpen={setOpen} />
            </div>
          </div>
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
export default MobileNavLinks;
