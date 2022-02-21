import { useMediaQuery } from "react-responsive";
import Logo from "../logo/logo";
import Accessibility from "./accessibility";
import { NavLinks } from "./navLinks";
import { DeviceSize } from "../responsive";
import MobileNavLinks from "./mobileNavLinks";

export function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <div className="navbar-container">
      <div className="logo">
        <Logo />
      </div>
      <div className="nav-links">{!isMobile && <NavLinks />}</div>
      <div className="login-section">
        {!isMobile && <Accessibility />}
        {isMobile && <MobileNavLinks />}
      </div>
    </div>
  );
}
