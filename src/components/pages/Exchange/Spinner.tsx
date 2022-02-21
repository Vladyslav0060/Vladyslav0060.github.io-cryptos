import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antLoadingIcon = <LoadingOutlined style={{ color: "white" }} spin />;
const Spinner: React.FC = () => {
  return (
    <div className="exchange-form spinner">
      <Spin size="large" indicator={antLoadingIcon} />
    </div>
  );
};

export default Spinner;
