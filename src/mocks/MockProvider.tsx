import { Dispatch, ReactNode } from "react";
import { GameContext } from "../context/GameContext";
import initialState from "../context/GameContext/initialState";
import { Action, GameState } from "../context/GameContext/types";

const MockProvider = ({
  children,
  mockState = initialState,
  mockDispatch = vi.fn(),
}: {
  children: ReactNode;
  mockState?: GameState;
  mockDispatch?: Dispatch<Action>;
}) => {
  return (
    <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default MockProvider;
