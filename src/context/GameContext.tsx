import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { GAME_ACTIONS } from "../types";

type Action =
  | { type: GAME_ACTIONS.SELECT_RANDOM_SUARE }
  | {
      type: GAME_ACTIONS.SET_GRID_SIZE;
      payload: { rows: number; cols: number };
    }
  | { type: GAME_ACTIONS.INCREASE_COUNTER }
  | { type: GAME_ACTIONS.START_GAME }
  | { type: GAME_ACTIONS.STOP_GAME };

interface GameState {
  rows: number;
  cols: number;
  activeSquare: number | undefined;
  elementsClicked: number;
  activeGame: boolean;
}

interface GameContextType {
  state: GameState;
  dispatch: Dispatch<Action>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: GameState = {
  rows: 0,
  cols: 0,
  activeSquare: undefined,
  elementsClicked: 0,
  activeGame: false,
};

const selectRandomSquare = (state: GameState): GameState => {
  const ramdomIndex = Math.floor(
    Math.random() * (state.rows * state.cols - 1) + 1
  );

  return {
    ...state,
    activeSquare: ramdomIndex,
  };
};

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case GAME_ACTIONS.SELECT_RANDOM_SUARE:
      return selectRandomSquare(state);

    case GAME_ACTIONS.SET_GRID_SIZE:
      return {
        ...state,
        rows: action.payload.rows,
        cols: action.payload.cols,
      };

    case GAME_ACTIONS.INCREASE_COUNTER:
      return {
        ...state,
        elementsClicked: state.elementsClicked + 1,
      };

    case GAME_ACTIONS.START_GAME:
      return {
        ...state,
        activeGame: true,
        elementsClicked: 0,
      };

    case GAME_ACTIONS.STOP_GAME:
      return {
        ...state,
        activeGame: false,
      };

    default:
      throw new Error("Unknown action type");
  }
};

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

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
