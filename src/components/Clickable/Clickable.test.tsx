import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  ACTIVE_BACKGROUND_COLOR,
  CLICKABLE_GAP,
  CLICKABLE_SIZE,
  INACTIVE_BACKGROUND_COLOR,
} from "../../constants";
import MockProvider from "../../mocks/MockProvider";
import Clickable from "./Clickable";
import initialState from "../../context/GameContext/initialState";
import {
  INCREASE_COUNTER,
  SELECT_RANDOM_SQUARE,
} from "../../context/GameContext/types";

describe("Clickable", () => {
  test("it should render without any param when it has the game context", () => {
    render(
      <MockProvider>
        <Clickable />
      </MockProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("it should not render when it has not the game context", () => {
    expect(() => render(<Clickable />)).toThrow(
      "useGameProvider must be used within a GameProvider"
    );
  });

  test("it should have a specified size comming defined as constants", () => {
    render(
      <MockProvider>
        <Clickable />
      </MockProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle(
      `width: ${CLICKABLE_SIZE - CLICKABLE_GAP}px`
    );
    expect(screen.getByRole("button")).toHaveStyle(
      `height: ${CLICKABLE_SIZE - CLICKABLE_GAP}px`
    );
  });

  test.each([
    [true, false],
    [false, true],
    [false, false],
  ])(
    "it should not be clickable if the element active state is %s and the game state is %s",
    async (activeElement, activeGame) => {
      const user = userEvent.setup();

      const mockDispatch = vi.fn();

      render(
        <MockProvider
          mockState={{ ...initialState, activeGame: activeGame }}
          mockDispatch={mockDispatch}
        >
          <Clickable active={activeElement} />
        </MockProvider>
      );

      await user.click(screen.getByRole("button"));

      expect(mockDispatch).not.toHaveBeenCalled();
    }
  );

  test("it should increase the counter and select a random square when clicked if the element is active and the game is happening", async () => {
    const user = userEvent.setup();

    const mockDispatch = vi.fn();

    render(
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        <Clickable active={true} />
      </MockProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: INCREASE_COUNTER,
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: SELECT_RANDOM_SQUARE,
    });
  });

  test("it should have active background if it is active", () => {
    render(
      <MockProvider>
        <Clickable active />
      </MockProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(ACTIVE_BACKGROUND_COLOR);
    expect(button).not.toHaveClass(INACTIVE_BACKGROUND_COLOR);
  });

  test("it should have inactive background if it is inactive", () => {
    render(
      <MockProvider>
        <Clickable />
      </MockProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(INACTIVE_BACKGROUND_COLOR);
    expect(button).not.toHaveClass(ACTIVE_BACKGROUND_COLOR);
  });

  test("it should accept a classname", () => {
    const dummyClass = "dummy";

    render(
      <MockProvider>
        <Clickable className={dummyClass} />
      </MockProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(dummyClass);
  });
});
