import { readLines } from "../utils";

const findFirstPositionOfUniqueSequence = (
  sequence: string,
  length: number
): number => {
  for (let i = 0; i < sequence.length - length; i++) {
    const letters = sequence.substring(i, i + length);
    const uniqueLetters = new Set(letters);

    if (uniqueLetters.size === length) {
      return i + length;
    }
  }
};

export const findMarkerPosition = (sequence: string): number =>
  findFirstPositionOfUniqueSequence(sequence, 4);

export const findStartOfMessagePosition = (sequence: string): number =>
  findFirstPositionOfUniqueSequence(sequence, 14);

export const part1 = (fileName: string): number =>
  findMarkerPosition(readLines(fileName)[0]);

export const part2 = (fileName: string): number =>
  findStartOfMessagePosition(readLines(fileName)[0]);
