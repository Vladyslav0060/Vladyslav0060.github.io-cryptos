import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import MenuToggle from "./menuToggle";
import { Link } from "react-router-dom";
const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
  z-index: 100;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  margin-bottom: 10px;
`;

// const Link = styled.a`
//   text-decoration: none;
//   color: inherit;
//   font-size: inherit;
// `;

const Marginer = styled.div`
  height: 2em;
`;

export function MobileNavLinks() {
  const [isOpen, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(false);
  };
  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper id="links-wrapper">
          <LinkItem>
            <Link className="link-text" to="/" onClick={clickHandler}>
              Home
            </Link>
          </LinkItem>
          <LinkItem>
            <Link className="link-text" to="/p1" onClick={clickHandler}>
              Page 1
            </Link>
          </LinkItem>
          <LinkItem>
            <Link className="link-text" to="/p2" onClick={clickHandler}>
              Page 2
            </Link>
          </LinkItem>
          <LinkItem>
            <Link className="link-text" to="/p3" onClick={clickHandler}>
              Page 3
            </Link>
          </LinkItem>
          <Marginer />
          <Accessibility setOpen={setOpen} />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
export default MobileNavLinks;
