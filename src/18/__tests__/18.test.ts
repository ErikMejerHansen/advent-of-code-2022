import { countSides, parseLine, part1 } from "../18";

describe("parsing", () => {
  it("can parse a input line as a 3d vector", () => {
    expect(parseLine("2,2,2")).toEqual([2, 2, 2]);
  });

  describe("part1", () => {
    it("can tell that a cube has 6 sides", () => {
      expect(countSides([[0, 0, 0]])).toEqual(6);
    });

    it("can tell that two adjacent cubes have 10 sides", () => {
      expect(
        countSides([
          [1, 1, 1],
          [2, 1, 1],
        ])
      ).toEqual(10);
    });

    it("detects a surface area of 64 for the example data", () => {
      expect(part1("src/18/__tests__/test-data.txt")).toEqual(64);
    });

    it("detects a surface area of 4604 for the data", () => {
      expect(part1("src/18/data/data.txt")).toEqual(4604);
    });
  });
});
