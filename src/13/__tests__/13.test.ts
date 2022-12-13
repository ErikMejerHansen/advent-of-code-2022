import { compare } from "../13";

describe("Dec 13", () => {
  describe("Part 1", () => {
    describe("comparisons", () => {
      it("returns true if values are numbers and left is smaller, otherwise false", () => {
        expect(compare(4, 5)).toBe(true);
        expect(compare(10, 4)).toBe(false);
      });

      it("returns true if the left and right are lists and the bigger numbers are in right", () => {
        expect(compare([4], [5])).toBe(true);
        expect(compare([11], [5])).toBe(false);
      });
    });
  });

  describe("Part 2", () => {
    //
  });
});
