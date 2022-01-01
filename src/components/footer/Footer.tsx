import { FC } from "react";
const Footer: FC = () => {
  return (
    <footer
      style={{
        position: "absolute",
        left: "0",
        bottom: "0",
        right: "0",
      }}
    >
      <span style={{ color: "white" }}>some content</span>
    </footer>
  );
};
export default Footer;
