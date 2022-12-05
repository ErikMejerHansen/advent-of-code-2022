import { parseMoves, parseStacks } from "../05";

describe("Dec 05", () => {
  describe("data parsing", () => {
    it("can parse the stacks", () => {
      const stacks = parseStacks(
        `
    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 `
      );

      expect(stacks).toEqual(
        new Map([
          [0, ["[Z]", "[N]"]],
          [1, ["[M]", "[C]", "[D]"]],
          [2, ["[P]"]],
        ])
      );
    });

    it("can parse a move commands", () => {
      expect(parseMoves("move 1 from 2 to 1")).toEqual([
        {
          from: 2,
          to: 1,
          amount: 1,
        },
      ]);

      expect(parseMoves("move 3 from 1 to 2")).toEqual([
        {
          from: 1,
          to: 2,
          amount: 3,
        },
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
