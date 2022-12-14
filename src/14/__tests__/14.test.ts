import {
  addSand,
  buildMap,
  parseLine,
  parseLineSegment,
  part1,
  viewMap,
} from "../14";

describe("Dec 14", () => {
  describe("parsing", () => {
    it("can parse a left to right horizontal line", () => {
      expect(parseLineSegment("0,0", " 4,0")).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ]);
    });

    it("can parse a right to left horizontal line", () => {
      expect(parseLineSegment("4,0", "0,0")).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ]);
    });

    it("can parse a top to down vertical line", () => {
      expect(parseLineSegment("0,0", "0,4")).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);
    });

    it("can parse a down to top vertical line", () => {
      expect(parseLineSegment("0,4", "0,0")).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);
    });
    it("can parse a line with multiple segments", () => {
      expect(parseLine("0,0 -> 4,0 -> 4,4")).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ]);
    });

    it("can build a slice map for the example data", () => {
      const [map, _] = buildMap("src/14/__tests__/test-data.txt");
      expect(viewMap(map)).toEqual(
        "......+...\n" +
          "..........\n" +
          "..........\n" +
          "..........\n" +
          "....#...##\n" +
          "....#...#.\n" +
          "..###...#.\n" +
          "........#.\n" +
          "........#.\n" +
          "#########."
      );
    });
  });

  describe("Part 1", () => {
    it("can move a gain of sand", () => {
      const [map, sandEntryPoint] = buildMap("src/14/__tests__/test-data.txt");

      addSand(map, sandEntryPoint);

      console.log(viewMap(map));

      expect(viewMap(map)).toEqual(
        "......+...\n" +
          "..........\n" +
          "..........\n" +
          "..........\n" +
          "....#...##\n" +
          "....#...#.\n" +
          "..###...#.\n" +
          "........#.\n" +
          "......o.#.\n" +
          "#########."
      );
    });

    it("can add 24 units of sand to the example", () => {
      expect(part1("src/14/__tests__/test-data.txt")).toEqual(24);
    });

    it("can add 24 units of sand", () => {
      expect(part1("src/14/data/data.txt")).toEqual(768);
    });
  });

  describe("Part 2", () => {
    //
  });
});
