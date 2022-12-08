import { parse } from "../08";

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
    //
  });

  describe("Part 2", () => {
    //
  });
});
