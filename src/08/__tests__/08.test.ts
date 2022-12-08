import { transpose } from "../../utils";
import {
  determineTreeVisibilities,
  evaluateRowVisibility,
  parse,
  parseFile,
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
  });

  describe("Part 2", () => {
    //
  });
});
