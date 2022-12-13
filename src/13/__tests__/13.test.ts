import { isOrderCorrect, parse, part1, part2, sortPackages } from "../13";

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
        expect(isOrderCorrect(4, 5)).toBe(true);
        expect(isOrderCorrect(10, 4)).toBe(false);
      });

      it("returns true if the left and right are lists and the bigger numbers are in right", () => {
        expect(isOrderCorrect([4], [5])).toBe(true);
        expect(isOrderCorrect([11], [5])).toBe(false);

        expect(isOrderCorrect([11, 12], [54, 70])).toBe(true);
        expect(isOrderCorrect([110, 12], [54, 70])).toBe(false);

        expect(isOrderCorrect([110, 12], [54])).toBe(false);
        expect(isOrderCorrect([110], [154, 100])).toBe(true);
      });

      it("returns true if the left side is a scalar and the right value is a list (and vice versa)", () => {
        expect(isOrderCorrect(4, [5])).toBe(true);
        expect(isOrderCorrect([10], 0)).toBe(false);
      });

      it("can handle one level of nesting", () => {
        expect(isOrderCorrect([4], [[5]])).toBe(true);
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
        expect(isOrderCorrect(left, right)).toBe(expected);
      });
    });

    it("finds the sum of valid pair indexes as 13 for the example data", () => {
      expect(part1("src/13/__tests__/test-data.txt")).toBe(13);
    });

    it("finds the sum of valid pair indexes as 5003 for the data", () => {
      expect(part1("src/13/data/data.txt")).toBe(5003);
    });
  });

  describe("Part 2", () => {
    it("can sort the example data and divider packets", () => {
      const expectedOrder = [
        [],
        [[]],
        [[[]]],
        [1, 1, 3, 1, 1],
        [1, 1, 5, 1, 1],
        [[1], [2, 3, 4]],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [[1], 4],
        [[2]],
        [3],
        [[4, 4], 4, 4],
        [[4, 4], 4, 4, 4],
        [[6]],
        [7, 7, 7],
        [7, 7, 7, 7],
        [[8, 7, 6]],
        [9],
      ];

      const data = parse("src/13/__tests__/test-data.txt");
      const sorted = sortPackages([...data, [[2]], [[6]]]);

      expect(sorted).toEqual(expectedOrder);
    });

    it("calculates the product of the marker indexes as 140 for the example data", () => {
      expect(part2("src/13/__tests__/test-data.txt")).toEqual(140);
    });

    it("calculates the product of the marker indexes as 20280", () => {
      expect(part2("src/13/data/data.txt")).toEqual(20280);
    });
  });
});
