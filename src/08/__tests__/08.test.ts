import {
  determineTreeVisibilities,
  evaluateRowVisibility,
  leftViewDistances,
  parse,
  parseFile,
  part1,
  part2,
  rightViewDistances,
  viewScores,
} from "../08";

describe("Dec 08", () => {
  describe("data parsing", () => {
    it("parses the data into a 2d array", () => {
      const input = "123\n456\n789";
      const parsed = parse(input);
      expect(parsed).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });
  });

  describe("Part 1", () => {
    it("parses the sample data into the expected shape", () => {
      const parsed = parseFile("src/08/__tests__/test-data.txt");
      expect(parsed).toEqual([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ]);
    });

    it("can tell row based visibility", () => {
      const row1 = [1, 2, 4, 5, 1];
      const visibilities1 = evaluateRowVisibility(row1);
      expect(visibilities1).toEqual([true, true, true, true, true]);

      const row2 = [1, 4, 4, 5, 1];
      const visibilities2 = evaluateRowVisibility(row2);
      expect(visibilities2).toEqual([true, true, false, true, true]);
    });

    it("can determine the correct visibilities for the sample data", () => {
      const trees = parseFile("src/08/__tests__/test-data.txt");
      const visibilityMap = determineTreeVisibilities(trees);

      expect(visibilityMap).toEqual([
        [true, true, true, true, true],
        [true, true, true, false, true],
        [true, true, false, true, true],
        [true, false, true, false, true],
        [true, true, true, true, true],
      ]);
    });

    it("can determine the correct number of visible trees for the sample data", () => {
      expect(part1("src/08/__tests__/test-data.txt")).toBe(21);
    });

    it("can determine the correct number of visible trees for the all zeros sample data", () => {
      expect(part1("src/08/__tests__/all-zeros-except-1.txt")).toBe(19);
    });

    it("can determine the number of visible trees for the data to be 1662", () => {
      expect(part1("src/08/data/data.txt")).toBe(1662);
    });
  });

  describe("Part 2", () => {
    it("can calculate the view distance when looking to the left", () => {
      expect(leftViewDistances([2, 3, 4, 3, 2])).toEqual([0, 1, 2, 1, 1]);
      expect(leftViewDistances([3, 3, 5, 4, 9])).toEqual([0, 1, 2, 1, 4]);
    });

    it("can calculate the view distance when looking to the right", () => {
      expect(rightViewDistances([6, 5, 4, 3, 2])).toEqual([4, 3, 2, 1, 0]);
      expect(rightViewDistances([3, 5, 3, 5, 3])).toEqual([1, 2, 1, 1, 0]);
    });

    it("can calculate the example view scores", () => {
      const example = [
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ];

      expect(viewScores(example)[3][2]).toEqual(8);
    });

    it("can calculate the best view scores", () => {
      expect(part2("src/08/data/data.txt")).toEqual(537600);
    });
  });
});
