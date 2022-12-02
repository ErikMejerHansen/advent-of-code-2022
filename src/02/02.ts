import * as fs from "fs";

export enum Move {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

export enum Result {
  Loss = 0,
  Draw = 3,
  Win = 6,
}

export type MovesLine = [Move, Move];
export type GameLine = [Move, Result];

export const parseMove = (move: string): Move => {
  if (move === "A" || move === "X") return Move.Rock;
  if (move === "B" || move === "Y") return Move.Paper;
  if (move === "C" || move === "Z") return Move.Scissors;
};

export const parsePart1Line = (line: string): MovesLine => {
  const [elfMoveString, myMoveString] = line.split(" ");

  return [parseMove(elfMoveString), parseMove(myMoveString)];
};

export const parsePart1Input = (fileName: string): MovesLine[] => {
  const data = fs.readFileSync(fileName).toString();
  return data.split("\n").map(parsePart1Line);
};

const determineResult = ([elfMove, myMove]: MovesLine): Result => {
  if (myMove === Move.Scissors && elfMove === Move.Rock) {
    return Result.Loss;
  }
  if (elfMove === Move.Scissors && myMove === Move.Rock) {
    return Result.Win;
  }
  if (elfMove > myMove) {
    return Result.Loss;
  }

  if (elfMove < myMove) {
    return Result.Win;
  }

  if (myMove > elfMove) {
    return Result.Win;
  }

  return Result.Draw;
};

export const chooseWinningMove = (elfMove: Move): Move => {
  switch (elfMove) {
    case Move.Rock:
      return Move.Paper;
    case Move.Paper:
      return Move.Scissors;
    case Move.Scissors:
      return Move.Rock;
  }
};

export const chooseLoosingMove = (elfMove: Move): Move => {
  switch (elfMove) {
    case Move.Rock:
      return Move.Scissors;
    case Move.Paper:
      return Move.Rock;
    case Move.Scissors:
      return Move.Paper;
  }
};

export const scoreLine = (line: MovesLine): number => {
  const moveScore = line[1].valueOf();
  const gameResult = determineResult(line);

  return moveScore + gameResult.valueOf();
};

export const scorePart1Game = (game: MovesLine[]): number =>
  game.map(scoreLine).reduce((acc, curr) => acc + curr, 0);

const parseResult = (result: string): Result => {
  if (result === "X") return Result.Loss;
  if (result === "Y") return Result.Draw;
  if (result === "Z") return Result.Win;
};

export const parsePart2Line = (line: string): GameLine => {
  const [moveString, resultString] = line.split(" ");

  return [parseMove(moveString), parseResult(resultString)];
};

export const parsePart2Input = (fileName: string): GameLine[] => {
  const data = fs.readFileSync(fileName).toString();
  return data.split("\n").map(parsePart2Line);
};

const chooseMove = (elfMove: Move, requiredResult: Result): Move => {
  switch (requiredResult) {
    case Result.Draw:
      return elfMove;
    case Result.Loss:
      return chooseLoosingMove(elfMove);
    case Result.Win:
      return chooseWinningMove(elfMove);
  }
};

export const scorePart2Game = (game: GameLine[]): number => {
  const moves: MovesLine[] = game.map((line): MovesLine => {
    return [line[0], chooseMove(line[0], line[1])];
  });
  return moves.map(scoreLine).reduce((acc, curr) => acc + curr, 0);
};
