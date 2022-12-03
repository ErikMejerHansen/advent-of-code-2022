import { readLines, sum, toSet } from "../utils";

export const splitInHalves = (input: string): [string, string] => {
  const halfLength = input.length / 2;
  const firstHalf = input.slice(0, halfLength);
  const secondHalf = input.slice(halfLength);
  return [firstHalf, secondHalf];
};

export const intersection = <T>(a: Set<T>, b: Set<T>): Set<T> =>
  new Set([...a].filter((x) => b.has(x)));

export const scoreItem = (item: string): number => {
  if (/[a-z]/.test(item)) {
    return item.charCodeAt(0) - 96;
  } else {
    return item.charCodeAt(0) - 38;
  }
};

const scoreLine = (line: string): number => {
  const [setA, setB] = splitInHalves(line).map(toSet);
  const misplacedItem = intersection(setA, setB);

  return scoreItem(misplacedItem.values().next().value);
};

export const scorePart1 = (fileName: string) => {
  const lines = readLines(fileName);
  const scores = lines.map(scoreLine);

  return sum(scores);
};

export const chunkInThrees = <T>(
  array: Array<T>
): [Array<T>, Array<T>, Array<T>] => {
  const chunks = new Array<Array<T>>();

  for (let i = 0; i < array.length; i += 3) {
    chunks.push(array.slice(i, i + 3));
  }
  return chunks as [Array<T>, Array<T>, Array<T>];
};

export const intersection3 = <T>(a: Set<T>, b: Set<T>, c: Set<T>): Set<T> => {
  const firstIntersection = intersection(a, b);
  const secondIntersection = intersection(firstIntersection, c);

  return secondIntersection;
};

export const scorePart2 = (fileName: string) => {
  const lines = readLines(fileName);
  const sets = lines.map(toSet);
  const chunks = chunkInThrees(sets);

  const commonItems = chunks.map((chunk) =>
    intersection3(chunk[0], chunk[1], chunk[2])
  );

  const scores = commonItems.map((item) =>
    scoreItem(item.values().next().value)
  );

  return sum(scores);
};
