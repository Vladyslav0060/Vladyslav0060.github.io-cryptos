import React, { useEffect, useState } from "react";
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
const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.div`
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #000;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 100;
  align-items: inherit;
  justify-content: flex-start;
  padding-top: 20px;
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
              flexWrap: "wrap",
              width: "100%",
              margin: "0 0 15px 60vw",
            }}
          >
            <NavLink className="link-text" to="/home" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faHome}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Home
            </NavLink>

            <NavLink className="link-text" to="/exchange">
              <FontAwesomeIcon
                icon={faExchangeAlt}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Exchange
            </NavLink>

            <NavLink className="link-text" to="/p1" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faListAlt}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Coins
            </NavLink>

            <NavLink className="link-text" to="/p3" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faChartBar}
                size="2x"
                color="white"
                // style={{ width: "15vw", cursor: "pointer" }}
              />
              Charts
            </NavLink>
            <NavLink className="link-text" to="/p2" onClick={clickHandler}>
              <FontAwesomeIcon
                icon={faComment}
                size="2x"
                color="white"
                // style={{ width: "10vw", cursor: "pointer" }}
              />
              Contact
            </NavLink>
          </div>
          <Accessibility setOpen={setOpen} />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
export default MobileNavLinks;
