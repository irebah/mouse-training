import { render, screen } from "@testing-library/react";
import { GameProvider } from "../../context/GameContext";
import Timer from "./Timer";
import MockProvider from "../../mocks/MockProvider";
import initialState from "../../context/GameContext/initialState";
import { act } from "react";
import { STOP_GAME } from "../../context/GameContext/types";

describe("Timer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("it should render when it has the game context", () => {
    render(
      <GameProvider>
        <Timer />
      </GameProvider>
    );

    expect(screen.getByTestId("timer")).toBeInTheDocument();
  });

  test("it should display the max time when active game is false", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: false }}>
        <Timer timeLeft={135} />
      </MockProvider>
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId("time-left")).toHaveTextContent("02:15");
  });

  test("it should decrease the timer when active game is true", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        <Timer timeLeft={135} />
      </MockProvider>
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId("time-left")).toHaveTextContent("02:10");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId("time-left")).toHaveTextContent("02:08");
  });

  test("it should not decrease the timer when active game is false", () => {
    render(
      <MockProvider mockState={{ ...initialState, activeGame: false }}>
        <Timer timeLeft={135} />
      </MockProvider>
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId("time-left")).toHaveTextContent("02:15");
  });

  test("it should trigger an action when the timer reaches zero", () => {
    const mockDispatch = vi.fn();

    render(
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        <Timer timeLeft={5} />
      </MockProvider>
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: STOP_GAME });
  });

  test("it should play an audio when the timer reaches 10 seconds", () => {
    const playMock = vi.fn();

    global.Audio = vi.fn().mockImplementation(() => ({
      play: playMock,
    }));

    render(
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        <Timer timeLeft={11} />
      </MockProvider>
    );

    expect(playMock).toHaveBeenCalledTimes(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(playMock).toHaveBeenCalledTimes(1);
  });
});
