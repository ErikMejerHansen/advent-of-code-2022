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

        expect(compare([11, 12], [54, 70])).toBe(true);
        expect(compare([110, 12], [54, 70])).toBe(false);

        expect(compare([110, 12], [54])).toBe(false);
        expect(compare([110], [154, 100])).toBe(true);
      });

      it("returns true if the left side is a scalar and the right value is a list (and vice versa)", () => {
        expect(compare(4, [5])).toBe(true);
        expect(compare([10], 0)).toBe(false);
      });

      it("can handle one level of nesting", () => {
        expect(compare([4], [[5]])).toBe(true);
      });
    });
  });

  describe("Part 2", () => {
    //
  });
});
