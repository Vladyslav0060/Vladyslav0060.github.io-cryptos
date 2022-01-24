import { FC } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import FramerWrapper from "../wrapper/FramerWrapper";
const Login: FC = () => {
  const navigate = useNavigate();
  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("entererd");
    const formData: any = new FormData(event.currentTarget);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };
  const redirect = () => {
    navigate("/register");
  };
  return (
    <FramerWrapper>
      <div className="page-wrapper">
        <div className="center">
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <div className="txt-field">
              <input type="text" required />
              {/* <span></span> */}
              <label>Username</label>
            </div>
            <div className="txt-field">
              <input type="password" required />
              {/* <span></span> */}
              <label>Password</label>
            </div>
            <input type="submit" value="Login" />
            <div className="signup_link">
              Not a member? <a onClick={redirect}>Register</a>
            </div>
          </form>
        </div>
      </div>
    </FramerWrapper>
  );
};

export default Login;
