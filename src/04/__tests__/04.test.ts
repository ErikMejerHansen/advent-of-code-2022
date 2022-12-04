import { fullyOverlaps, parseLine, part1, part2, partialOverlaps } from "../04";

describe("Dec 04", () => {
  describe("Part 1", () => {
    it("can parse am assigment line", () => {
      expect(parseLine("2-4,6-8")).toEqual([
        [2, 4],
        [6, 8],
      ]);
    });

    it("can detect fully overlapping assignments", () => {
      expect(fullyOverlaps([1, 6], [3, 5])).toBe(true);
      expect(fullyOverlaps([10, 11], [10, 11])).toBe(true);
      expect(fullyOverlaps([5, 8], [2, 9])).toBe(true);
      expect(fullyOverlaps([5, 8], [8, 9])).toBe(false);
    });

    it("calculates the number of fully contained assignments on the sample data as 2", () => {
      expect(part1("src/04/__tests__/test-data.txt")).toEqual(2);
    });

    it("calculates the number of fully contained assignments on the data as 515", () => {
      expect(part1("src/04/data/data.txt")).toEqual(515);
    });
  });

  describe("Part 2", () => {
    it("can detect overlaps", () => {
      expect(partialOverlaps([1, 6], [3, 5])).toBe(true);
      expect(partialOverlaps([6, 6], [6, 7])).toBe(true);
      expect(partialOverlaps([3, 9], [10, 11])).toBe(false);
    });

    it("calculates the number of fully contained assignments on the sample data as 4", () => {
      expect(part2("src/04/__tests__/test-data.txt")).toEqual(4);
    });

    it("calculates the number of fully contained assignments on the data as 8834", () => {
      expect(part2("src/04/data/data.txt")).toEqual(883);
    });
  });
});
