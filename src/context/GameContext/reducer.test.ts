import initialState from "./initialState";
import reducer from "./reducer";
import {
  GameState,
  INCREASE_COUNTER,
  SELECT_RANDOM_SQUARE,
  SET_GRID_SIZE,
  START_GAME,
  STOP_GAME,
} from "./types";

describe("reducer", () => {
  test("it should allow to set a specific grid size", () => {
    const state: GameState = { ...initialState, rows: 0, cols: 0 };
    const rows = 4;
    const cols = 6;

    const result: GameState = reducer(state, {
      type: SET_GRID_SIZE,
      payload: { rows, cols },
    });

    expect(result.rows).toBe(rows);
    expect(result.cols).toBe(cols);
  });

  test("it should allow to increase the number of clicks", () => {
    const elementsClicked = 7;

    const state: GameState = { ...initialState, elementsClicked };

    const result: GameState = reducer(state, { type: INCREASE_COUNTER });

    expect(result.elementsClicked).toBe(elementsClicked + 1);
  });

  test("it should mark the game as active and reset the number of elements clicked when the action is start game", () => {
    const state: GameState = {
      ...initialState,
      activeGame: false,
      elementsClicked: 5,
    };

    const result: GameState = reducer(state, { type: START_GAME });

    expect(result.elementsClicked).toBe(0);
    expect(result.activeGame).toBe(true);
  });

  test("it should mark the game as not active and keep the number of elements clicked when the action is stop game", () => {
    const elementsClicked = 5;

    const state: GameState = {
      ...initialState,
      activeGame: true,
      elementsClicked,
    };

    const result: GameState = reducer(state, { type: STOP_GAME });

    expect(result.elementsClicked).toBe(elementsClicked);
    expect(result.activeGame).toBe(false);
  });

  test("it should return a random element to click between 1 and (rows * cols) -1", () => {
    const state: GameState = {
      ...initialState,
      activeElement: 0,
      rows: 1,
      cols: 1,
    };

    const result: GameState = reducer(state, { type: SELECT_RANDOM_SQUARE });

    expect(result.activeElement).toBe(1);
  });

  test("it should return a random element to click between 1 and (rows * cols) -1", () => {
    const rows = 9;
    const cols = 12;

    const state: GameState = {
      ...initialState,
      activeElement: 0,
      rows,
      cols,
    };

    const result: GameState = reducer(state, { type: SELECT_RANDOM_SQUARE });

    expect(result.activeElement).toBeGreaterThanOrEqual(1);
    expect(result.activeElement).toBeLessThanOrEqual(rows * cols - 1);
  });

  test("it should return error if an unknow action type is sent", () => {
    const invalidCall = () =>
      // forcing to accept any so we can test a typescript error checking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reducer as any)(initialState, { type: "random" });

    expect(invalidCall).toThrow("Unknown action type");
  });
});
