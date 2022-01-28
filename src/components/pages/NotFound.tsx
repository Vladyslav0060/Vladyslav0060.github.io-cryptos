import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FramerWrapper from "../wrapper/FramerWrapper";

const NotFound: FC = () => {
  const location = useLocation();
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/home");
  }, []);

  return (
    <FramerWrapper>
      <div className="page-wrapper" style={{ flexDirection: "column" }}>
        <h1 style={{ color: "white" }}>Not found (404)</h1>
        <p>
          Page <code>{location.pathname}</code> does not exist
        </p>
      </div>
    </FramerWrapper>
  );
};

export default NotFound;
