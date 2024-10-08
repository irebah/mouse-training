import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("it should render without crashing", () => {
    render(<App />);
  });

  test("it should render the title", () => {
    render(<App />);

    expect(screen.getByText("Mouse training")).toBeInTheDocument();
  });

  test("it should render the timer", () => {
    render(<App />);

    expect(screen.getByTestId("time-left")).toBeInTheDocument();
  });

  test("it should render the number of clicks (zero)", () => {
    render(<App />);

    expect(screen.getByTestId("elementsClicked")).toHaveTextContent("0");
  });

  test("it should render the start button", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });
});
