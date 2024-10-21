import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  ACTIVE_BACKGROUND_COLOR,
  CLICKABLE_GAP,
  CLICKABLE_SIZE,
  ERROR_BACKGROUND_COLOR,
  INACTIVE_BACKGROUND_COLOR,
} from "../../constants";
import MockProvider from "../../mocks/MockProvider";
import Clickable from "./Clickable";
import initialState from "../../context/GameContext/initialState";
import {
  INCREASE_COUNTER,
  SELECT_RANDOM_SQUARE,
} from "../../context/GameContext/types";
import { GameProvider } from "../../context/GameContext";
import { act } from "react";

describe("Clickable", () => {
  test("it should render without any param when it has the game context", () => {
    render(
      <GameProvider>
        <Clickable />
      </GameProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("it should have a specified size comming defined as constants", () => {
    render(
      <GameProvider>
        <Clickable />
      </GameProvider>
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
      <GameProvider>
        <Clickable active />
      </GameProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(ACTIVE_BACKGROUND_COLOR);
    expect(button).not.toHaveClass(INACTIVE_BACKGROUND_COLOR);
  });

  test("it should have inactive background if it is inactive", () => {
    render(
      <GameProvider>
        <Clickable />
      </GameProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(INACTIVE_BACKGROUND_COLOR);
    expect(button).not.toHaveClass(ACTIVE_BACKGROUND_COLOR);
  });

  test("it should accept a classname", () => {
    const dummyClass = "dummy";

    render(
      <GameProvider>
        <Clickable className={dummyClass} />
      </GameProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(dummyClass);
  });

  test("it should trigger onError when clicked if the element is not active and the game is happening", async () => {
    const user = userEvent.setup();

    const mockDispatch = vi.fn();
    const onError = vi.fn();

    render(
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        <Clickable active={false} onError={onError} />
      </MockProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    expect(onError).toHaveBeenCalled();
  });
});

describe("Clickable fake time", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("it should use error color (for 300ms) when clicked if the element is not active and the game is happening", async () => {
    const user = userEvent.setup();

    const mockDispatch = vi.fn();
    const onError = vi.fn();

    render(
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        <Clickable active={false} onError={onError} />
      </MockProvider>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(button).toHaveClass(ERROR_BACKGROUND_COLOR);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(button).not.toHaveClass(ERROR_BACKGROUND_COLOR);
  });
});
