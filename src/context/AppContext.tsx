import React, { createContext, useReducer, Dispatch } from "react";
import { AppReducer, AppActions, initStateType } from "../reducers/AppReducer";
const initState = {
  symbols: [],
  isContactModalOpen: false,
  isLoggedIn: false,
};
export const AppContext = createContext<{
  state: initStateType;
  dispatch: Dispatch<AppActions>;
}>({ state: initState, dispatch: () => null });
export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
