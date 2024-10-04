import { createContext, ReactNode, useContext, useReducer } from "react";
import { GameContextType } from "./types";
import reducer from "./reducer";
import initialState from "./initialState";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameProvider = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameProvider must be used within a GameProvider");
  }
  return context;
};
