import { subtract } from "../utils";

type Position = [number, number];
export const updateTailPosition = (
  tail: Position,
  head: Position
): Position => {
  const [x, y] = subtract(tail, head);

  // Horizontal
  if (x === 2 && y === 0) return [1, 0];
  if (x === -2 && y === 0) return [-1, 0];

  // Vertical
  if (x === 0 && y === 2) return [0, 1];
  if (x === 0 && y === -2) return [0, -1];

  // Diagonals: Up and to the left
  if (x === -1 && y === -2) return [-1, -1];
  // Diagonals: Up and to the right
  if (x === 1 && y === -2) return [1, -1];
  // Diagonals: Down and to the left
  if (x === -1 && y === 2) return [-1, 1];
  // Diagonals: Down and to the right
  if (x === 1 && y === 2) return [1, 1];

  return [0, 0];
};

export const parseMove = (input: string): [number, number] => {
  const [direction, distanceString] = input.split(" ");
  const distance = parseInt(distanceString);

  switch (direction) {
    case "R":
      return [distance, 0];
    case "U":
      return [0, -distance];
    case "L":
      return [-distance, 0];
    case "D":
      return [0, 1];
  }
};
