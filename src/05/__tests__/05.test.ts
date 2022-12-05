import {
  executeMove,
  executeOrderRetainingMove,
  parseMoves,
  parseStacks,
  part1,
  part2,
} from "../05";

describe("Dec 05", () => {
  describe("data parsing", () => {
    it("can parse the stacks", () => {
      const stacks = parseStacks(
        `
    [D]                            
[N] [C]                            
[Z] [M] [P]                        
`
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

    it("can execute a move", () => {
      const stacks = new Map([
        [0, ["[Z]", "[N]"]],
        [1, ["[M]", "[C]", "[D]"]],
        [2, ["[P]"]],
      ]);

      const move = { from: 1, to: 2, amount: 1 };

      const updatedStack = executeMove(move, stacks);

      expect(updatedStack.get(0)).toEqual(["[Z]"]);
      expect(updatedStack.get(1)).toEqual(["[M]", "[C]", "[D]", "[N]"]);
    });
  });

  describe("Part 1", () => {
    //
    it("calculates the part1 message for the sample data as CMZ", () => {
      expect(
        part1("src/05/__tests__/moves.txt", "src/05/__tests__/stacks.txt")
      ).toEqual("CMZ");
    });

    it("calculates the part1 message for the data as RNZLFZSJH", () => {
      expect(part1("src/05/data/moves.txt", "src/05/data/stacks.txt")).toEqual(
        "RNZLFZSJH"
      );
    });
  });

  describe("Part 2", () => {
    it("can execute a move", () => {
      const stacks = new Map([
        [0, ["[Z]", "[N]"]],
        [1, ["[M]", "[C]", "[D]"]],
        [2, ["[P]"]],
      ]);

      const move = { from: 2, to: 3, amount: 2 };

      const updatedStack = executeOrderRetainingMove(move, stacks);

      expect(updatedStack.get(1)).toEqual(["[M]"]);
      expect(updatedStack.get(2)).toEqual(["[P]", "[C]", "[D]"]);
    });

    it("calculates the part1 message for the sample data as CMZ", () => {
      expect(
        part2("src/05/__tests__/moves.txt", "src/05/__tests__/stacks.txt")
      ).toEqual("MCD");
    });

    it("calculates the part1 message for the data as CNSFCGJSM", () => {
      expect(part2("src/05/data/moves.txt", "src/05/data/stacks.txt")).toEqual(
        "CNSFCGJSM"
      );
    });
  });
});
