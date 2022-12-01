import {
  groupByEmptyLine,
  parseData,
  part1,
  part2,
  splitByEmptyLine,
} from "../01";

describe("Dec 01", () => {
  describe("Part 1", () => {
    it("splits the input by newline", () => {
      const input = "1233\n5678\n\n234\n2342\n\n34";
      expect(splitByEmptyLine(input)).toHaveLength(3);
    });

    it("groups input by empty line", () => {
      const input = "1233\n5678\n\n777\n888";
      const output = groupByEmptyLine(input);
      expect(output).toEqual([
        ["1233", "5678"],
        ["777", "888"],
      ]);
    });

    it("parses the puzzle imput as a 2d array of numbers", () => {
      const parsedData = parseData("src/01/__tests__/test-data.txt");
      expect(parsedData).toEqual([
        [1233, 5678],
        [234, 2342, 34],
      ]);
    });

    it("finds the sum group with the highest calories count", () => {
      expect(part1("src/01/__tests__/test-data.txt")).toEqual(6911);
    });

    it("finds the solution to part 1", () => {
      expect(part1("src/01/data/data.txt")).toBe(72511);
    });
  });

  describe("Part 2", () => {
    it("finds the solution to part 1", () => {
      expect(part2("src/01/data/data.txt")).toBe(212117);
    });
  });
});
