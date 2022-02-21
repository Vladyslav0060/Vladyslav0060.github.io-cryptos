import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { DeviceSize } from "../responsive/index";
import { IAccessibility } from "../../types/types";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { actionTypes } from "../../reducers/AppReducer";
import Notification from "../Notification";
import { AccessibilityContainer, RegisterButton, LoginButton } from "./styled";

const Accessibility: React.FC<IAccessibility> = (props: IAccessibility) => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const setOpen = props.setOpen;
  const {
    state: { isLoggedIn },
    dispatch,
  } = useContext(AppContext);
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: actionTypes.SET_IS_LOGGED_IN, payload: false });
    Notification({
      message: "Log out",
      description: "Log out succeed",
      duration: 2,
    });
  };
  const clickHandler = () => {
    if (isMobile && setOpen) setOpen(false);
  };
  return !isLoggedIn ? (
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
  ) : (
    <AccessibilityContainer>
      <span className="right-link-text" onClick={logout}>
        <LoginButton>Logout</LoginButton>
      </span>
    </AccessibilityContainer>
  );
};

export default Accessibility;
