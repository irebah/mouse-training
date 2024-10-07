import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

// Perform cleanup after each test
afterEach(() => {
  cleanup();
});
