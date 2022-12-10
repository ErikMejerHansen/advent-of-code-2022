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
  if (x === -2 && y === -2) return add(tail, [-1, -1]);
  if (x === 2 && y === 2) return add(tail, [1, 1]);
  if (x === -2 && y === 2) return add(tail, [-1, 1]);
  if (x === 2 && y === -2) return add(tail, [1, -1]);

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

export const unique = (moves: Position[]): Position[] => {
  return moves.filter((a, index) => {
    const remaining = moves.slice(index + 1);

    return remaining.every((b) => !(a[0] === b[0] && a[1] === b[1]));
  });
};

export const part1 = (fileName: string): number => {
  const data = readLines(fileName);
  const moves = data.map(parseMove).flat();
  const rope = [
    [0, 0],
    [0, 0],
  ] as Position[];

  const tailHistory = new Array<Position>();

  moves.map((move) => {
    const movedHead = add(rope[0], move);
    const movedTail = updateTailPosition(rope[1], movedHead);
    rope[0] = movedHead;
    rope[1] = movedTail;

    tailHistory.push(movedTail);
  });

  return unique(tailHistory).length;
};

export const part2 = (fileName: string): number => {
  const data = readLines(fileName);
  const moves = data.map(parseMove).flat();
  const rope = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ] as Position[];

  const tailHistory = new Array<Position>();

  moves.map((move) => {
    const movedHead = add(rope[0], move);
    const knot1 = updateTailPosition(rope[1], movedHead);
    const knot2 = updateTailPosition(rope[2], knot1);
    const knot3 = updateTailPosition(rope[3], knot2);
    const knot4 = updateTailPosition(rope[4], knot3);
    const knot5 = updateTailPosition(rope[5], knot4);
    const knot6 = updateTailPosition(rope[6], knot5);
    const knot7 = updateTailPosition(rope[7], knot6);
    const knot8 = updateTailPosition(rope[8], knot7);
    const knot9 = updateTailPosition(rope[9], knot8);

    rope[0] = movedHead;
    rope[1] = knot1;
    rope[2] = knot2;
    rope[3] = knot3;
    rope[4] = knot4;
    rope[5] = knot5;
    rope[6] = knot6;
    rope[7] = knot7;
    rope[8] = knot8;
    rope[9] = knot9;

    tailHistory.push(knot9);
  });

  return unique(tailHistory).length;
};
