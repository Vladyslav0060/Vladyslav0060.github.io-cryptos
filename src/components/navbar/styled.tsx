import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  background-color: black;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  @media (max-width: 768px) {
    padding: 0 1.5em 0 0;
  }
`;
export const LeftSection = styled.div`
  display: flex;
`;
export const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;
export const RightSection = styled.div`
  display: flex;
`;
export const Button = styled.div`
  z-index: 99;
  cursor: pointer;
  filter: invert(71%) sepia(98%) saturate(1284%) hue-rotate(164deg)
    brightness(100%) contrast(103%);
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
export const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
export const MobileLinksWrapper = styled.div`
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
export const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
`;
export const LinkItem = styled.li`
  color: white;
  height: 100%;
  padding: 0 1.1em;
  // color: #222;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;
  &:hover {
    // color: #14bba7;
    color: #9d67f1;
  }
`;
export const AccessibilityContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100vw;
    margin-top: 15px;
    gap: 10px;
  }
`;

export const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  width: 85px;
  border-radius: 20px;
  // border-radius: 13px;
  background-color: #53c5f1b3;
  background-image: linear-gradient(to right, transparent 0%, #3a3497 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: white;
    background-color: #3a3497;
    background-image: linear-gradient(to right, transparent 0%, #53c5f1b3 100%);
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

export const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  width: 85px;
  border-radius: 20px;
  // border-radius: 13px;
  background-color: #3a3497;
  background-image: linear-gradient(to right, transparent 0%, #d042ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: white;
    background-color: #d042ff;
    background-image: linear-gradient(to right, transparent 0%, #3a3497 100%);
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;
