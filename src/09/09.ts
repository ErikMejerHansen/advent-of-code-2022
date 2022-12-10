import { add, readLines, subtract } from "../utils";

type Position = [number, number];
export const updateTailPosition = (
  tail: Position,
  head: Position
): Position => {
  const [x, y] = subtract(tail, head);

  // Horizontal
  if (x === 2 && y === 0) return add(tail, [1, 0]);
  if (x === -2 && y === 0) return add(tail, [-1, 0]);

  // Vertical
  if (x === 0 && y === 2) return add(tail, [0, 1]);
  if (x === 0 && y === -2) return add(tail, [0, -1]);

  // Diagonals
  if (x === -1 && y === -2) return add(tail, [-1, -1]);
  if (x === 1 && y === -2) return add(tail, [1, -1]);
  if (x === -1 && y === 2) return add(tail, [-1, 1]);
  if (x === 1 && y === 2) return add(tail, [1, 1]);
  if (x === 2 && y === -1) return add(tail, [1, -1]);
  if (x === 2 && y === 1) return add(tail, [1, 1]);
  if (x === -2 && y === 1) return add(tail, [-1, 1]);
  if (x === -2 && y === -1) return add(tail, [-1, -1]);

  // No movement
  return tail;
};

export const parseMove = (input: string): [number, number][] => {
  const [direction, distanceString] = input.split(" ");
  const distance = parseInt(distanceString);

  switch (direction) {
    case "R":
      return new Array(distance).fill([1, 0]);
    case "U":
      return new Array(distance).fill([0, -1]);
    case "L":
      return new Array(distance).fill([-1, 0]);
    case "D":
      return new Array(distance).fill([0, 1]);
  }
};

export const move = ({
  tailPosition,
  headPosition,
  movement,
}: {
  tailPosition: Position;
  headPosition: Position;
  movement: Position;
}): { updatedTailPosition: Position; updatedHeadPosition: Position } => {
  const updatedHeadPosition = add(headPosition, movement);
  const updatedTailPosition = updateTailPosition(
    tailPosition,
    updatedHeadPosition
  );
  return {
    updatedTailPosition: updatedTailPosition,
    updatedHeadPosition: updatedHeadPosition,
  };
};

export const unique = (moves: Position[]): Position[] => {
  return moves.filter((a, index) => {
    const remaining = moves.slice(index + 1);

    return remaining.every((b) => !(a[0] === b[0] && a[1] === b[1]));
  });
};

interface MovementReducerReturn {
  tailPosition: Position;
  headPosition: Position;
  tailHistory: Position[];
}
export const part1 = (fileName: string): number => {
  const data = readLines(fileName);
  const moves = data.map(parseMove).flat();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tailPosition, headPosition, tailHistory } = moves.reduce(
    (
      { tailPosition, headPosition, tailHistory }: MovementReducerReturn,
      movement
    ) => {
      const { updatedTailPosition, updatedHeadPosition } = move({
        tailPosition,
        headPosition,
        movement,
      });

      tailHistory.push(updatedTailPosition);

      return {
        tailPosition: updatedTailPosition,
        headPosition: updatedHeadPosition,
        tailHistory,
      };
    },
    {
      tailPosition: [0, 0],
      headPosition: [0, 0],
      tailHistory: new Array<Position>(),
    }
  );

  return unique(tailHistory).length;
};
