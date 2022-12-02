import {
  chooseLoosingMove,
  chooseWinningMove,
  MovesLine,
  Move,
  parseMove,
  parsePart1Input,
  parsePart1Line,
  parsePart2Line,
  Result,
  scorePart1Game,
  scoreLine,
  parsePart2Input,
  GameLine,
  scorePart2Game,
} from "../02";

describe("Dec 02", () => {
  describe("parseMove", () => {
    describe("Part 1", () => {
      it.each([
        ["A", Move.Rock],
        ["B", Move.Paper],
        ["C", Move.Scissors],
        ["X", Move.Rock],
        ["Y", Move.Paper],
        ["Z", Move.Scissors],
      ])("parses %s as %o", (input, expected) => {
        expect(parseMove(input)).toEqual(expected);
      });
    });

    describe("parseLine", () => {
      it("can parse a line of moves", () => {
        const parsedLine = parsePart1Line("A X");
        expect(parsedLine).toEqual([Move.Rock, Move.Rock]);
      });
    });

    describe("parsePuzzleInput", () => {
      it("can parse the example input", () => {
        expect(parsePart1Input("src/02/__tests__/test-data.txt")).toEqual([
          [Move.Rock, Move.Paper],
          [Move.Paper, Move.Rock],
          [Move.Scissors, Move.Scissors],
        ]);
      });
    });

    describe("scoreLine", () => {
      it("can calculate the score of a line", () => {
        const firstLine: [Move, Move] = [Move.Rock, Move.Paper];
        const secondLine: [Move, Move] = [Move.Paper, Move.Rock];
        const thirdLine: [Move, Move] = [Move.Scissors, Move.Scissors];
        const fourthLine: [Move, Move] = [Move.Scissors, Move.Rock];

        expect(scoreLine(firstLine)).toEqual(2 + 6);
        expect(scoreLine(secondLine)).toEqual(1);
        expect(scoreLine(thirdLine)).toEqual(3 + 3);
        expect(scoreLine(fourthLine)).toEqual(1 + 6);
      });
    });

    it("calculates the score of the sample game to be 15", () => {
      const game: MovesLine[] = [
        [Move.Rock, Move.Paper],
        [Move.Paper, Move.Rock],
        [Move.Scissors, Move.Scissors],
      ];

      expect(scorePart1Game(game)).toEqual(15);
    });

    it("calculates the score of the game to be 14827", () => {
      const parsedInput = parsePart1Input("src/02/data/data.txt");
      expect(scorePart1Game(parsedInput)).toEqual(14827);
    });
  });

  describe("Part 2", () => {
    describe("chooseWinningMove", () => {
      it.each([
        [Move.Rock, Move.Paper],
        [Move.Paper, Move.Scissors],
        [Move.Scissors, Move.Rock],
      ])("chooses %j when the elf chooses %j", (elfMove, winningMove) => {
        expect(chooseWinningMove(elfMove)).toEqual(winningMove);
      });
    });

    describe("chooseLoosingMove", () => {
      it.each([
        [Move.Rock, Move.Scissors],
        [Move.Paper, Move.Rock],
        [Move.Scissors, Move.Paper],
      ])("chooses %j when the elf chooses %j", (elfMove, loosingMove) => {
        expect(chooseLoosingMove(elfMove)).toEqual(loosingMove);
      });
    });

    describe("parseLine", () => {
      it("can parse a line of moves", () => {
        const parsedLine = parsePart2Line("A Y");
        expect(parsedLine).toEqual([Move.Rock, Result.Draw]);
      });
    });

    describe("parsePuzzleInput", () => {
      it("can parse the example input", () => {
        expect(parsePart2Input("src/02/__tests__/test-data.txt")).toEqual([
          [Move.Rock, Result.Draw],
          [Move.Paper, Result.Loss],
          [Move.Scissors, Result.Win],
        ]);
      });
    });

    it("calculates the score of the sample game to be 15", () => {
      const game: GameLine[] = [
        [Move.Rock, Result.Draw],
        [Move.Paper, Result.Loss],
        [Move.Scissors, Result.Win],
      ];

      expect(scorePart2Game(game)).toEqual(12);
    });

    it("calculates the score of the game to be 13889", () => {
      const parsedInput = parsePart2Input("src/02/data/data.txt");
      expect(scorePart2Game(parsedInput)).toEqual(13889);
    });
  });
});
