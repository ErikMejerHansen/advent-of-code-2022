import { part1, part2 } from "../12";

describe("Dec 12", () => {
  describe("Part 1", () => {
    it("finds the shortest path trough the sample data", () => {
      expect(part1("src/12/__tests__/test-data.txt")).toEqual(31);
    });

    it("finds the shortest path trough the data", () => {
      expect(part1("src/12/data/data.txt")).toEqual(350);
    });
  });

  describe("Part 2", () => {
    it("finds the shortest path from elevation 0 the destination in the example data", () => {
      expect(part2("src/12/__tests__/test-data.txt")).toEqual(29);
    });

    it("finds the shortest path from elevation 0 the destination in the data", () => {
      expect(part2("src/12/data/data.txt")).toEqual(349);
    });
  });
});
