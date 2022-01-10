type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface ISymbols {
  id: string;
  symbol: string;
}
export type initStateType = {
  symbols: ISymbols[];
};
export enum actionTypes {
  ADD_SYMBOLS = "ADD_SYMBOLS",
}
type AppPayload = {
  [actionTypes.ADD_SYMBOLS]: ISymbols;
};
export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
export const AppReducer = (state: initStateType, action: AppActions) => {
  console.log("Entered", action);
  switch (action.type) {
    case actionTypes.ADD_SYMBOLS:
      return { ...state, symbols: [...state.symbols, action.payload] };
  }
};
