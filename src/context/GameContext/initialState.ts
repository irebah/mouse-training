import { GameState } from "./types";

const initialState: GameState = {
  rows: 0,
  cols: 0,
  activeElement: undefined,
  elementsClicked: 0,
  activeGame: false,
};

export default initialState;
