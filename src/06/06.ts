import { readLines } from "../utils";

export const findMarkerPosition = (sequence: string): number => {
  for (let i = 0; i < sequence.length - 3; i++) {
    const [a, b, c, d] = sequence.substring(i);
    const uniqueLetters = new Set([a, b, c, d]);

    if (uniqueLetters.size === 4) {
      return i + 4;
    }
  }
};

export const part1 = (fileName: string): number =>
  findMarkerPosition(readLines(fileName)[0]);
