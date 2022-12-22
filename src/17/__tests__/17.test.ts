import { Jet, parseJets, part1 } from "../17";

describe("Dec 17", () => {
  describe("parsing", () => {
    it("can parse a series of jets", () => {
      expect(parseJets("<<>")).toEqual([Jet.Left, Jet.Left, Jet.Right]);
    });
  });
  describe("Part 1", () => {
    test("that the game ends with a hight of 3068 for the example input", () => {
      expect(part1("src/17/__tests__/test-data.txt")).toEqual(3068);
    });

    test("that the game ends with a hight of 3090 for the input", () => {
      expect(part1("src/17/data/data.txt")).toEqual(3090);
    });
  });

  describe("Part 2", () => {
    //
  });
});
