import { render, screen } from "@testing-library/react";
import MockProvider from "../../mocks/MockProvider";
import DummyComponentContext from "../../mocks/DummyComponentContext";
import initialState from "./initialState";
import { Action, START_GAME } from "./types";
import userEvent from "@testing-library/user-event";
import { GameProvider } from ".";

describe("GameProvider", () => {
  test("it should throw an exception when useGameProvider is used outside of a provider context", () => {
    expect(() => render(<DummyComponentContext />)).toThrow(
      "useGameProvider must be used within a GameProvider"
    );
  });

  test("it should provides the initial state to the children", () => {
    render(
      <GameProvider>
        <DummyComponentContext />
      </GameProvider>
    );

    expect(screen.getByTestId("state")).toHaveTextContent(
      JSON.stringify(initialState)
    );
  });

  test("it should provides possibility to dispatch actions to the children", async () => {
    const user = userEvent.setup();
    const mockDispatch = vi.fn();
    const action: Action = { type: START_GAME };

    render(
      <MockProvider mockDispatch={mockDispatch}>
        <DummyComponentContext action={action} />
      </MockProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith(action);
  });
});
