import { FC, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { actionTypes } from "../../reducers/AppReducer";
import Modal from "react-modal";
import axios from "axios";
import { DeviceSize } from "../responsive";
import { useMediaQuery } from "react-responsive";
import { REGEXP_EMAIL } from "../regexp/Regexp";
import { Form, Input, Button } from "antd";
interface Props {
  isOpen?: boolean;
}
const ContactMe: FC<Props> = (props: Props) => {
  const {
    state: { isContactModalOpen },
    dispatch,
  } = useContext(AppContext);
  const closeModal = () => {
    // setIsOpen(false);
    dispatch({
      type: actionTypes.SET_IS_CONTACT_MODAL_OPEN,
      payload: !isContactModalOpen,
    });
  };
  const sendMessage = (values: any) => {
    axios.post("http://localhost:5000/mailer/text-mail", {
      to: values["email"],
      subject: values["name"],
      text: values["message"],
    });
    return true;
  };
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const onFinish = async (values: any) => {
    if (REGEXP_EMAIL.test(values["email"])) {
      try {
        sendMessage(values);
        console.log("Success:", values);
      } catch (e) {
        console.log("err", e);
      }
    } else alert("Incorrect email");
    return;
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000000a1",
      width: isMobile ? "300px" : "600px",
      border: 0,
    },
    overlay: { zIndex: 1000, backgroundColor: "#4c4c4cbf" },
  };
  return (
    <Modal
      isOpen={isContactModalOpen}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={closeModal}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
      >
        <Form.Item>
          <h2 className="form-item">Contact form</h2>
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Username</label>}
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
          className="form-item"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Email</label>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Message</label>}
          name="message"
          rules={[{ required: true, message: "Please enter your message!" }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            textAlign: "center",
            margin: "0",
          }}
        >
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactMe;
