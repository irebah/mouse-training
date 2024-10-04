import { Dispatch } from "react";

export interface GameState {
  rows: number;
  cols: number;
  activeElement: number | undefined;
  elementsClicked: number;
  activeGame: boolean;
}

export interface GameContextType {
  state: GameState;
  dispatch: Dispatch<Action>;
}

export const SELECT_RANDOM_SQUARE = "SELECT_RANDOM_SUARE";
export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const START_GAME = "START_GAME";
export const STOP_GAME = "STOP_GAME";

interface SelectRandomSquareAction {
  type: typeof SELECT_RANDOM_SQUARE;
}

interface SetGridSizeAction {
  type: typeof SET_GRID_SIZE;
  payload: { rows: number; cols: number };
}

interface IncreaseCounterAction {
  type: typeof INCREASE_COUNTER;
}

interface StartGameAction {
  type: typeof START_GAME;
}

interface StopGameAction {
  type: typeof STOP_GAME;
}

export type Action =
  | SelectRandomSquareAction
  | SetGridSizeAction
  | IncreaseCounterAction
  | StartGameAction
  | StopGameAction;
