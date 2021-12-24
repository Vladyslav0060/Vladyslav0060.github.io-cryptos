import styled from "styled-components";
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
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;

  &:hover {
    border-top: 2px solid #2ecc71;
  }
`;

// const LinkText = styled.a`
//   text-decoration: none;
//   color: inherit;
//   font-size: inherit;
// `;

export function NavLinks() {
  return (
    <NavLinksContainer>
      <LinksWrapper>
        <LinkItem>
          <Link className="link-text" to="/">
            Home
          </Link>
        </LinkItem>
        <LinkItem>
          <Link className="link-text" to="/p1">
            Page 1
          </Link>
        </LinkItem>
        <LinkItem>
          <Link className="link-text" to="/p2">
            Page 2
          </Link>
        </LinkItem>
        <LinkItem>
          <Link className="link-text" to="/p3">
            Page 3
          </Link>
        </LinkItem>
      </LinksWrapper>
    </NavLinksContainer>
  );
}
