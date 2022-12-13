import { compare } from "../13";

describe("Dec 13", () => {
  describe("Part 1", () => {
    describe("comparisons", () => {
      it("returns true if values are numbers and left is smaller, otherwise false", () => {
        expect(compare(4, 5)).toBe(true);
        expect(compare(10, 4)).toBe(false);
      });
    });
  });

  describe("Part 2", () => {
    //
  });
});
