import { getMinutes, getSeconds } from "./time";

describe("time utils", () => {
  describe("getSeconds", () => {
    test("when the number of seconds is lower than 60 it just returns the seconds as string", () => {
      const seconds = 40;
      const result = getSeconds(seconds);

      expect(result).toBe(`${seconds}`);
    });

    test("it returns the number of seconds with 2 digits even when is a single digit", () => {
      const seconds = 4;
      const result = getSeconds(seconds);

      expect(result).toBe(`0${seconds}`);
    });

    test("it returns the number of seconds ignoring the minutes when there are more than 60 seconds passed as parameter", () => {
      const seconds = 301; // this is 5 minutes and 1 second
      const result = getSeconds(seconds);

      expect(result).toBe(`01`);
    });
  });

  describe("getMinutes", () => {
    test("when the number of seconds is lower than 60 it returns 0", () => {
      const seconds = 40;
      const result = getMinutes(seconds);

      expect(result).toBe("00");
    });

    test("it returns the number of seconds with 2 digits even when is a single digit", () => {
      const seconds = 64;
      const result = getMinutes(seconds);

      expect(result).toBe("01");
    });
  });
});
