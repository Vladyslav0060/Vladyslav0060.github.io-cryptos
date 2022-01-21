import "./App.css";
import { Navbar } from "./components/navbar";
import Modal from "react-modal";
import ContactMe from "./components/pages/ContactMe";
const App = () => {
  Modal.setAppElement("#root");
  return (
    <div className="App">
      <Navbar />
      <ContactMe />
    </div>
  );
};

export default App;
