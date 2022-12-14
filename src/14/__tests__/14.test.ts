import { parseLineSegment } from "../14";

describe("Dec 14", () => {
  describe("parsing", () => {
    it("can parse a left to right horizontal line", () => {
      expect(parseLineSegment("0,0 -> 4,0")).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ]);
    });

    it("can parse a right to left horizontal line", () => {
      expect(parseLineSegment("4,0 -> 0,0")).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ]);
    });

    it("can parse a top to down vertical line", () => {
      expect(parseLineSegment("0,0 -> 0,4")).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);
    });

    it("can parse a down to top vertical line", () => {
      expect(parseLineSegment("0,4 -> 0,0")).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);
    });
  });

  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
