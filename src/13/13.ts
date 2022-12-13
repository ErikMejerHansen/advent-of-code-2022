import { readLines } from "../utils";

const WRONG_ORDER = 1;
const CORRECT_ORDER = -1;
const EQUALITY = 0;

export const compare = (left, right): number => {
  if (typeof left === "number" && typeof right === "number") {
    if (left === right) {
      return EQUALITY;
    } else if (left < right) {
      return CORRECT_ORDER;
    } else {
      return WRONG_ORDER;
    }
  }

  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return EQUALITY;
  }

  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length > 0
  ) {
    return CORRECT_ORDER;
  }

  if (
    Array.isArray(left) &&
    left.length > 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return WRONG_ORDER;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const [leftHead, ...leftTail] = left;
    const [rightHead, ...rightTail] = right;
    const head = compare(leftHead, rightHead);
    if (head !== EQUALITY) {
      return head;
    } else {
      return compare(leftTail, rightTail);
    }
  }

  if (typeof left === "number" && Array.isArray(right)) {
    return compare([left], right);
  }

  if (Array.isArray(left) && typeof right === "number") {
    return compare(left, [right]);
  }
};

export const isOrderCorrect = (a, b): boolean => {
  const correctOrder = compare(a, b) === CORRECT_ORDER;
  return correctOrder;
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

  const comparisons = pairs.map(([left, right]) => isOrderCorrect(left, right));

  const sum = comparisons.reduce(
    (sum, include, index) => (include ? sum + index + 1 : sum),
    0
  );

  return sum;
};

export const sortPackages = (packages) => {
  return packages.sort(compare);
};

const findFirstDividerMarkerIndex = (packages): number =>
  packages.map(JSON.stringify).indexOf("[[2]]") + 1;

const findSecondDividerMarkerIndex = (packages): number =>
  packages.map(JSON.stringify).indexOf("[[6]]") + 1;

export const part2 = (fileName: string) => {
  const packages = parse(fileName);
  const sorted = sortPackages([...packages, [[2]], [[6]]]);

  const firstIndex = findFirstDividerMarkerIndex(sorted);
  const secondIndex = findSecondDividerMarkerIndex(sorted);

  return firstIndex * secondIndex;
};
