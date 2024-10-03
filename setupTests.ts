import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Perform cleanup after each test
afterEach(() => {
  cleanup();
});
