import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from "../logo/logo";
import { Accessibility } from "./accessibility";
import { NavLinks } from "./navLinks";
import { DeviceSize } from "../responsive";
import MobileNavLinks from "./mobileNavLinks";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CoinList from "../pages/CoinList";
import HomePage from "../pages/HomePage";
import { FC } from "react";
import Charts from "../pages/Charts";
import TestChart from "../pages/TestChart";
import Exchange from "../pages/Exchange";
const NavbarContainer = styled.div`
  width: 100%;
  background-color: black;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
`;
const LeftSection = styled.div`
  display: flex;
`;
const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;
const RightSection = styled.div`
  display: flex;
`;
export function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <Router>
      <NavbarContainer>
        <LeftSection>
          <Logo />
        </LeftSection>
        <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
        <RightSection>
          {!isMobile && <Accessibility />}
          {isMobile && <MobileNavLinks />}
        </RightSection>
      </NavbarContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/p1" element={<CoinList />} />
        <Route path="/p3" element={<TestChart />} />
        <Route path="/login" element={<>login</>} />
        <Route path="/register" element={<>register</>} />
      </Routes>
    </Router>
  );
}
