import { FC } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FramerWrapper from "../wrapper/FramerWrapper";
const Register: FC = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/login");
  };
  return (
    // <motion.div
    //   exit={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   initial={{ opacity: 0 }}
    //   className="page-wrapper"
    // >
    <FramerWrapper>
      <div className="page-wrapper">
        <div className="center">
          <h1>Register</h1>
          <form>
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
            <input type="submit" value="Register" />
            <div className="signup_link">
              Already a member? <a onClick={redirect}>Sign up</a>
            </div>
          </form>
        </div>
        {/* </motion.div> */}
      </div>
    </FramerWrapper>
  );
};

export default Register;
