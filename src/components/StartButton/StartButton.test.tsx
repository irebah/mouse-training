import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockProvider from "../../mocks/MockProvider";
import initialState from "../../context/GameContext/initialState";
import {
  SELECT_RANDOM_SQUARE,
  START_GAME,
} from "../../context/GameContext/types";
import StartButton from "./StartButton";

describe("Start Button", () => {
  test("it should render without any param when it has the game context", () => {
    render(
      <MockProvider>
        <StartButton />
      </MockProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("it should not render when the game is active", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        <StartButton />
      </MockProvider>
    );

    expect(screen.queryAllByRole("button").length).toBe(0);
  });

  test("it should not render when it has not the game context", () => {
    expect(() => render(<StartButton />)).toThrow(
      "useGameProvider must be used within a GameProvider"
    );
  });

  test("it should start the game and select a random square when the button is clicked and the game is not active", async () => {
    const user = userEvent.setup();

    const mockDispatch = vi.fn();

    render(
      <MockProvider
        mockState={{ ...initialState, activeGame: false }}
        mockDispatch={mockDispatch}
      >
        <StartButton />
      </MockProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: START_GAME,
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: SELECT_RANDOM_SQUARE,
    });
  });
});
