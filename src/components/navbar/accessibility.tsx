import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { DeviceSize } from "../responsive/index";
import { IAccessibility } from "../../types/types";
const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #3a3497;
  background-image: linear-gradient(to left, transparent 0%, #38bb9dc4 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: orange;
    background-image: linear-gradient(to right, transparent 0%, yellow 100%);
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #3a3497;
  background-image: linear-gradient(to right, transparent 0%, #d042ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: black;
    background-color: orange;
    background-image: linear-gradient(to right, transparent 0%, yellow 100%);
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

export function Accessibility(props: IAccessibility) {
  const setOpen = props.setOpen;
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const clickHandler = () => {
    if (isMobile && setOpen) setOpen(false);
  };
  return (
    <AccessibilityContainer>
      <NavLink
        className="right-link-text"
        to="/register"
        onClick={clickHandler}
      >
        <RegisterButton>Register</RegisterButton>
      </NavLink>

      <NavLink className="right-link-text" to="/login" onClick={clickHandler}>
        <LoginButton>Login</LoginButton>
      </NavLink>
    </AccessibilityContainer>
  );
}
