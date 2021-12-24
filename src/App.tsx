import { FC, useContext, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import { ThemeContext } from "./context/ThemeContext";
import { Types } from "./reducers/themeReducer";
import { TrashContext } from "./context/TrashContext";
import { actionTypes } from "./reducers/trashReducer";
const App = () => {
  // const {
  //   state: { theme },
  //   dispatch,
  // } = useContext(ThemeContext);
  // console.log(theme);
  const {
    state: { trashBoxes },
    dispatch,
  } = useContext(TrashContext);
  console.log(trashBoxes);
  return (
    <div className="App">
      <Navbar />
      <div>
        {/* <button
          onClick={() => dispatch({ type: Types.SET_THEME, payload: "dark" })}
        >
          TEST
        </button> */}
        {/* <button
          onClick={() =>
            dispatch({
              type: actionTypes.ADD_TRASHBOX,
              payload: { id: 10, name: "rubbis-2", weight: 13 },
            })
          }
        >
          TEST
        </button> */}
      </div>
    </div>
  );
};

export default App;
