// import "./App.css";
import "./styles/styles.css";
import { Navbar } from "./components/navbar";
import Modal from "react-modal";
import ContactMe from "./components/pages/ContactMe";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import { actionTypes } from "./reducers/AppReducer";
import AppRoutes from "./routes/Routes";

const App = () => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    localStorage.getItem("token") &&
      dispatch({ type: actionTypes.SET_IS_LOGGED_IN, payload: true });
  }, []);
  Modal.setAppElement("#root");
  return (
    <Router>
      <Navbar />
      <ContactMe />
      <AnimatePresence>
        <AppRoutes />
      </AnimatePresence>
    </Router>
  ); //
};

export default App;
