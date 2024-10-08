import { render, screen } from "@testing-library/react";
import { GameProvider } from "../../context/GameContext";
import ClickableContainer from "./ClickableContainer";
import MockProvider from "../../mocks/MockProvider";
import { SET_GRID_SIZE } from "../../context/GameContext/types";
import initialState from "../../context/GameContext/initialState";
import { OPACITY_INACTIVE_GAME } from "../../constants";

describe("ClickableContainer", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLDivElement.prototype, "clientWidth", {
      get: () => 1024,
    });

    Object.defineProperty(HTMLDivElement.prototype, "clientHeight", {
      get: () => 768,
    });
  });

  test("it should render when it has the game context", () => {
    render(
      <GameProvider>
        <ClickableContainer />
      </GameProvider>
    );

    expect(screen.getByTestId("clickableContainer")).toBeInTheDocument();
  });

  test("it should not render when it has not the game context", () => {
    expect(() => render(<ClickableContainer />)).toThrow(
      "useGameProvider must be used within a GameProvider"
    );
  });

  test("it should accept a classname", () => {
    const dummyClass = "dummy";

    render(
      <GameProvider>
        <ClickableContainer className={dummyClass} />
      </GameProvider>
    );

    const grid = screen.getByTestId("clickableContainer").childNodes[0];
    expect(grid).toHaveClass(dummyClass);
  });

  test("it should set the number of columns and rows based on the size of the grid", () => {
    const mockDispatch = vi.fn();

    render(
      <MockProvider mockDispatch={mockDispatch}>
        <ClickableContainer clickableSize={10} />
      </MockProvider>
    );

    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: SET_GRID_SIZE,
      payload: { rows: 76, cols: 102 },
    });
  });

  test("it should render a grid of columns depending on the size of the element", () => {
    render(
      <GameProvider>
        <ClickableContainer clickableSize={10} />
      </GameProvider>
    );

    const grid = screen.getByTestId("clickableContainer").childNodes[0];

    // based on the fact that we are mocking clientWidth to 1024px we expect 102 cols
    expect(grid).toHaveStyle("gridTemplateColumns: repeat(102, 10px)");
  });

  test("it should render as many clickable elements as rows * cols", () => {
    render(
      <GameProvider>
        <ClickableContainer clickableSize={10} />
      </GameProvider>
    );

    const grid = screen.getByTestId("clickableContainer").childNodes[0];

    // based on the fact that we are mocking clientWidth to 1024px and clientHeight to 768px
    expect(grid.childNodes.length).toBe(102 * 76);
  });

  test("it should render with opacity if the game is not active", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: false }}>
        <ClickableContainer />
      </MockProvider>
    );

    // based on the fact that we are mocking clientWidth to 1024px and clientHeight to 768px
    expect(screen.getByTestId("clickableContainer")).toHaveClass(
      OPACITY_INACTIVE_GAME
    );
  });

  test("it should render with no opacity if the game is active", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        <ClickableContainer />
      </MockProvider>
    );

    // based on the fact that we are mocking clientWidth to 1024px and clientHeight to 768px
    expect(screen.getByTestId("clickableContainer")).not.toHaveClass(
      OPACITY_INACTIVE_GAME
    );
  });
});
