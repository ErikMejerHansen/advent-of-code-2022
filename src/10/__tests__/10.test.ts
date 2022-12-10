import { parseCommand } from "../10";

describe("Dec 10", () => {
  describe("parsing", () => {
    it("can parse commands", () => {
      expect(parseCommand("noop")).toEqual({ opcode: "noop", cycles: 1 });
      expect(parseCommand("addx 3")).toEqual({
        opcode: "addx",
        cycles: 2,
        argument: 3,
      });
    });
  });
  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
