import CryptosLogo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { LogoWrapper, LogoImg, LogoText } from "./styled";
const Logo: React.FC = () => {
  return (
    <NavLink className="link-text" to="/home">
      <LogoWrapper>
        <LogoImg>
          <img src={CryptosLogo} alt="Cryptos logo" />
        </LogoImg>
        <LogoText>Cryptos</LogoText>
      </LogoWrapper>
    </NavLink>
  );
};
export default Logo;
