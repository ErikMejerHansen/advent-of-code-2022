import { compare, parse, part1 } from "../13";

describe("Dec 13", () => {
  describe("parsing", () => {
    it("can parse the example data", () => {
      const parsed = parse("src/13/__tests__/test-data.txt");
      expect(parsed[0]).toEqual([1, 1, 3, 1, 1]);
      expect(parsed[12]).toEqual([[[]]]);
    });
  });

  describe("Part 1", () => {
    describe("comparisons", () => {
      it("returns true if values are numbers and left is smaller, otherwise false", () => {
        expect(compare(4, 5)).toBe(true);
        expect(compare(10, 4)).toBe(false);
      });

      it("returns true if the left and right are lists and the bigger numbers are in right", () => {
        expect(compare([4], [5])).toBe(true);
        expect(compare([11], [5])).toBe(false);

        expect(compare([11, 12], [54, 70])).toBe(true);
        expect(compare([110, 12], [54, 70])).toBe(false);

        expect(compare([110, 12], [54])).toBe(false);
        expect(compare([110], [154, 100])).toBe(true);
      });

      it("returns true if the left side is a scalar and the right value is a list (and vice versa)", () => {
        expect(compare(4, [5])).toBe(true);
        expect(compare([10], 0)).toBe(false);
      });

      it("can handle one level of nesting", () => {
        expect(compare([4], [[5]])).toBe(true);
      });

      it.each([
        [[1, 1, 3, 1, 1], [1, 1, 5, 1, 1], true],
        [[[1], [2, 3, 4]], [[1], 4], true],
        [[9], [[8, 7, 6]], false],
        [[[4, 4], 4, 4], [[4, 4], 4, 4, 4], true],
        [[7, 7, 7, 7], [7, 7, 7], false],
        [[], [3], true],
        [[[[]]], [[]], false],
        [
          [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
          [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
          false,
        ],
      ])("will compare %j and %j and return %s", (left, right, expected) => {
        expect(compare(left, right)).toBe(expected);
      });
    });

    it("finds the sum of valid pair indexes as 13 for the example data", () => {
      expect(part1("src/13/__tests__/test-data.txt")).toBe(13);
    });

    it("finds the sum of valid pair indexes as 13 for the data", () => {
      expect(part1("src/13/data/data.txt")).toBe(13);
    });
  });

  describe("Part 2", () => {
    //
  });
});
