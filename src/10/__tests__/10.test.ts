import {
  buildRegisterHistory,
  draw,
  parseInstruction,
  part1,
  runInstruction,
} from "../10";

describe("Dec 10", () => {
  describe("parsing", () => {
    it("can parse commands", () => {
      expect(parseInstruction("noop")).toEqual({ opcode: "noop" });
      expect(parseInstruction("addx 3")).toEqual({
        opcode: "addx",
        argument: 3,
      });
    });
  });

  describe("running instructions", () => {
    it("noop does not affect register state", () => {
      const noop = parseInstruction("noop");
      const registerHistory = runInstruction(noop, { x: 4 });
      expect(registerHistory).toEqual([{ x: 4 }]);
    });

    it("addx does affects register state after two cycles", () => {
      const addx = parseInstruction("addx 10");
      const registerHistory = runInstruction(addx, { x: 4 });
      expect(registerHistory).toEqual([{ x: 4 }, { x: 14 }]);
    });
  });

  describe("Part 1", () => {
    it("has the correct register state with the sample data", () => {
      const registerHistory = buildRegisterHistory(
        "src/10/__tests__/test-data.txt"
      );

      expect(registerHistory[18]).toEqual({ x: 21 });
      expect(registerHistory[58]).toEqual({ x: 19 });
      expect(registerHistory[98]).toEqual({ x: 18 });
      expect(registerHistory[138]).toEqual({ x: 21 });
      expect(registerHistory[178]).toEqual({ x: 16 });
      expect(registerHistory[218]).toEqual({ x: 18 });
    });

    it("calculates the register history sum as 13140 for the sample data", () => {
      expect(part1("src/10/__tests__/test-data.txt")).toEqual(13140);
    });

    it("calculates the register history sum as 14420 for the data", () => {
      expect(part1("src/10/data/data.txt")).toEqual(14420);
    });
  });

  describe("Part 2", () => {
    it("draws the the sample data correctly", () => {
      const registerHistory = buildRegisterHistory(
        "src/10/__tests__/test-data.txt"
      );

      expect(draw(registerHistory)).toEqual(
        "##..##..##..##..##..##..##..##..##..##..\n" +
          "###...###...###...###...###...###...###.\n" +
          "####....####....####....####....####....\n" +
          "#####.....#####.....#####.....#####.....\n" +
          "######......######......######......####\n" +
          "#######.......#######.......#######....."
      );
    });

    it("draws the data correctly", () => {
      const registerHistory = buildRegisterHistory("src/10/data/data.txt");
      const result = draw(registerHistory);
      console.log(result);

      expect(result).toEqual(
        "###...##..#....###..###..####..##..#..#.\n" +
          "#..#.#..#.#....#..#.#..#....#.#..#.#..#.\n" +
          "#..#.#....#....#..#.###....#..#..#.#..#.\n" +
          "###..#.##.#....###..#..#..#...####.#..#.\n" +
          "#.#..#..#.#....#.#..#..#.#....#..#.#..#.\n" +
          "#..#..###.####.#..#.###..####.#..#..##.."
      );
    });
  });
});
