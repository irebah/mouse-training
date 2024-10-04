import {
  Action,
  GameState,
  INCREASE_COUNTER,
  SELECT_RANDOM_SQUARE,
  SET_GRID_SIZE,
  START_GAME,
  STOP_GAME,
} from "./types";

const selectRandomSquare = (state: GameState): GameState => {
  const ramdomIndex = Math.floor(
    Math.random() * (state.rows * state.cols - 1) + 1
  );

  return {
    ...state,
    activeElement: ramdomIndex,
  };
};

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case SELECT_RANDOM_SQUARE:
      return selectRandomSquare(state);

    case SET_GRID_SIZE:
      return {
        ...state,
        rows: action.payload.rows,
        cols: action.payload.cols,
      };

    case INCREASE_COUNTER:
      return {
        ...state,
        elementsClicked: state.elementsClicked + 1,
      };

    case START_GAME:
      return {
        ...state,
        activeGame: true,
        elementsClicked: 0,
      };

    case STOP_GAME:
      return {
        ...state,
        activeGame: false,
      };

    default:
      throw new Error("Unknown action type");
  }
};

export default reducer;
