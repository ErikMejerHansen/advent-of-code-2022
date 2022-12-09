import { parseMove, updateTailPosition } from "../09";

describe("Dec 09", () => {
  describe("rope movement", () => {
    it("does not move the tail if head is in the same position", () => {
      expect(updateTailPosition([0, 0], [0, 0])).toEqual([0, 0]);
    });

    it("moves the tail when the head moved horizontally", () => {
      expect(updateTailPosition([0, 0], [1, 0])).toEqual([0, 0]);
      expect(updateTailPosition([0, 0], [-1, 0])).toEqual([0, 0]);

      expect(updateTailPosition([0, 0], [2, 0])).toEqual([1, 0]);
      expect(updateTailPosition([0, 0], [-2, 0])).toEqual([-1, 0]);
    });

    it("moves the tail when the head moved vertically", () => {
      expect(updateTailPosition([0, 0], [0, 1])).toEqual([0, 0]);
      expect(updateTailPosition([0, 0], [0, -1])).toEqual([0, 0]);

      expect(updateTailPosition([0, 0], [0, 2])).toEqual([0, 1]);
      expect(updateTailPosition([0, 0], [0, -2])).toEqual([0, -1]);
    });

    it("moves the tail when the head moved diagonally up and to the left", () => {
      expect(updateTailPosition([0, 0], [-1, -1])).toEqual([0, 0]);
      expect(updateTailPosition([0, 0], [-1, -2])).toEqual([-1, -1]);
    });

    it("moves the tail when the head moved diagonally up and to the right", () => {
      expect(updateTailPosition([0, 0], [1, -1])).toEqual([0, 0]);
      expect(updateTailPosition([0, 0], [1, -2])).toEqual([1, -1]);
    });

    it("moves the tail when the head moved diagonally down and to the left", () => {
      expect(updateTailPosition([0, 0], [-1, 1])).toEqual([0, 0]);
      expect(updateTailPosition([0, 0], [-1, 2])).toEqual([-1, 1]);
    });

    it("moves the tail when the head moved diagonally down and to the right", () => {
      expect(updateTailPosition([0, 0], [1, 1])).toEqual([0, 0]);
      expect(updateTailPosition([0, 0], [1, 2])).toEqual([1, 1]);
    });
  });

  describe("data parsing", () => {
    it.each([
      ["R 4", [4, 0]],
      ["U 3", [0, -3]],
      ["L 2", [-2, 0]],
      ["D 1", [0, 1]],
    ])("parses %s  %j", (input, expected) => {
      expect(parseMove(input)).toEqual(expected);
    });
  });

  describe("Part 1", () => {});

  describe("Part 2", () => {
    //
  });
});
