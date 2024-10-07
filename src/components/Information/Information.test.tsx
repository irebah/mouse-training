import { render, screen } from "@testing-library/react";
import initialState from "../../context/GameContext/initialState";
import MockProvider from "../../mocks/MockProvider";
import Information from "./Information";
import { OPACITY_INACTIVE_GAME } from "../../constants";
import { GameProvider } from "../../context/GameContext";

describe("Information", () => {
  test("it should render without any param when it has the game context", () => {
    render(
      <GameProvider>
        <Information />
      </GameProvider>
    );

    expect(screen.getByTestId("information")).toBeInTheDocument();
  });

  test("it should not render when it has not the game context", () => {
    expect(() => render(<Information />)).toThrow(
      "useGameProvider must be used within a GameProvider"
    );
  });

  test("it should display the number of elements clicked from the state", () => {
    const dummyElementsClicked = 100;
    render(
      <MockProvider
        mockState={{ ...initialState, elementsClicked: dummyElementsClicked }}
      >
        <Information />
      </MockProvider>
    );

    expect(screen.getByTestId("elementsClicked")).toHaveTextContent(
      `${dummyElementsClicked}`
    );
  });

  test("it should render a Timer", () => {
    vi.mock("../Timer/Timer", () => {
      return {
        __esModule: true,
        default: () => <div data-testid="timer">Mocked Timer</div>,
      };
    });

    render(
      <GameProvider>
        <Information />
      </GameProvider>
    );

    expect(screen.getByTestId("timer")).toBeInTheDocument();
  });

  test("it should accept a classname", () => {
    const dummyClass = "dummy";

    render(
      <GameProvider>
        <Information className={dummyClass} />
      </GameProvider>
    );

    expect(screen.getByTestId("information")).toHaveClass(dummyClass);
  });

  test("it should have opacity when the game is not started", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: false }}>
        <Information />
      </MockProvider>
    );

    expect(screen.getByTestId("information")).toHaveClass(
      OPACITY_INACTIVE_GAME
    );
  });

  test("it should not have opacity when the game is active", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        <Information />
      </MockProvider>
    );

    expect(screen.getByTestId("information")).not.toHaveClass(
      OPACITY_INACTIVE_GAME
    );
  });
});
