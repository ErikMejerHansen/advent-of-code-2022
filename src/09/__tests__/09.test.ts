import { move, parseMove, part1, unique, updateTailPosition } from "../09";

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

      expect(updateTailPosition([1, 0], [3, 0])).toEqual([2, 0]);
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

      expect(updateTailPosition([2, -2], [4, -3])).toEqual([-1, -1]);
    });
  });

  describe("data parsing", () => {
    it.each([
      [
        "R 4",
        [
          [1, 0],
          [1, 0],
          [1, 0],
          [1, 0],
        ],
      ],
      [
        "U 3",
        [
          [0, -1],
          [0, -1],
          [0, -1],
        ],
      ],
      [
        "L 2",
        [
          [-1, 0],
          [-1, 0],
        ],
      ],
      ["D 1", [[0, 1]]],
    ])("parses %s  %j", (input, expected) => {
      expect(parseMove(input)).toEqual(expected);
    });
  });

  describe("Part 1", () => {
    it("returns the new positions for the head and tail", () => {
      expect(
        move({
          tailPosition: [0, 0],
          headPosition: [0, 1],
          movement: [0, 1],
        })
      ).toEqual({ updatedTailPosition: [0, 1], updatedHeadPosition: [0, 2] });
    });

    it("can remove duplicates from a list positions", () => {
      expect(
        unique([
          [0, 1],
          [0, 1],
          [1, 1],
        ])
      ).toEqual([
        [0, 1],
        [1, 1],
      ]);
    });

    it("calculates the number of unique tail positions as 13 for the sample data", () => {
      expect(part1("src/09/__tests__/test-data.txt")).toEqual(13);
    });

    it("calculates the number of unique tail positions as 6243 for the data", () => {
      expect(part1("src/09/data/data.txt")).toEqual(6243);
    });
  });

  describe("Part 2", () => {
    //
  });
});
