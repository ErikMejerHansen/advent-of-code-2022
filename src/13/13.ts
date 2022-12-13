import { readLines } from "../utils";

const scalarCompare = (left: number, right: number) => left < right;

export const compare = (left, right) => {
  if (typeof left === "number" && typeof right === "number") {
    if (left === right) {
      return;
    }

    return scalarCompare(left, right);
  }

  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return true;
  }

  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length > 0
  ) {
    return true;
  }

  if (
    Array.isArray(left) &&
    left.length > 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return false;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const [leftHead, ...leftTail] = left;
    const [rightHead, ...rightTail] = right;
    const head = compare(leftHead, rightHead);
    const tail = compare(leftTail, rightTail);
    if (head !== undefined) {
      return head;
    } else {
      return tail;
    }
  }

  if (typeof left === "number" && Array.isArray(right)) {
    return compare([left], right);
  }

  if (Array.isArray(left) && typeof right === "number") {
    return compare(left, [right]);
  }
};

export const parse = (fileName: string) => {
  const lines = readLines(fileName);

  const packages = lines
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line));

  return packages;
};

export const chunkInPairs = <T>(array: Array<T>): [Array<T>, Array<T>] => {
  const chunks = new Array<Array<T>>();

  for (let i = 0; i < array.length; i += 2) {
    chunks.push(array.slice(i, i + 2));
  }
  return chunks as [Array<T>, Array<T>];
};

export const part1 = (fileName: string): number => {
  const packages = parse(fileName);
  const pairs = chunkInPairs(packages);

  const comparisons = pairs.map(([left, right]) => compare(left, right));

  const sum = comparisons.reduce(
    (sum, include, index) => (include ? sum + index + 1 : sum),
    0
  );

  return sum;
};
