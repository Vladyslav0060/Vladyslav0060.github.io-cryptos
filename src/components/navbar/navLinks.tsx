import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { actionTypes } from "../../reducers/AppReducer";
import { NavLinksContainer, LinksWrapper, LinkItem } from "./styled";

export function NavLinks() {
  const {
    state: { isContactModalOpen },
    dispatch,
  } = useContext(AppContext);
  return (
    <NavLinksContainer>
      <LinksWrapper>
        {/* <NavLink
          className="link-text"
          to="/home"
          activeClassName="link-text-active"
        >
          <LinkItem>Home</LinkItem>
        </NavLink> */}
        <NavLink
          activeClassName="link-text-active"
          className="link-text"
          to="/coins"
        >
          <LinkItem>Coins</LinkItem>
        </NavLink>
        <NavLink
          className="link-text"
          to="/exchange"
          activeClassName="link-text-active"
        >
          <LinkItem>Exchange</LinkItem>
        </NavLink>
        <NavLink
          className="link-text"
          to="/charts"
          activeClassName="link-text-active"
        >
          <LinkItem>Charts</LinkItem>
        </NavLink>
        <LinkItem
          onClick={() =>
            dispatch({
              type: actionTypes.SET_IS_CONTACT_MODAL_OPEN,
              payload: !isContactModalOpen,
            })
          }
        >
          <span className="link-text" style={{ cursor: "pointer" }}>
            Contact
          </span>
        </LinkItem>
      </LinksWrapper>
    </NavLinksContainer>
  );
}
