import * as fs from "fs";

export const parseDataToNumberArray = (fileName: string) => {
  const buffer = fs.readFileSync(fileName);
  return buffer
    .toString()
    .split("\n")
    .map((it) => parseFloat(it));
};

export const parseStringArrayToNumberArray = (numbers: string[]) =>
  numbers.map((s) => parseFloat(s));

export const readLines = (fileName: string) =>
  fs.readFileSync(fileName).toString().split("\n");

export const sum = (numbers: number[]): number =>
  numbers.reduce((sum, curr) => sum + curr, 0);

export const toSet = (input: string): Set<string> => new Set(input.split(""));

export const findMaximum = (numbers: number[]) =>
  numbers.sort((a, b) => a - b)[numbers.length - 1];

export type Matrix<T> = T[][];
export interface Coordinate {
  x: number;
  y: number;
}
export const transpose = <T>(matrix: Matrix<T>): Matrix<T> =>
  matrix[0].map((x, i) => matrix.map((x) => x[i]));

export const upsert = <K, V>(
  map: Map<K, V>,
  key: K,
  updater: (_key: K, _previous?: V) => V,
  verbose = false
) => {
  if (verbose) {
    console.log("Upsert:", key, "into:", map);
  }
  const newValue = updater(key, map.get(key));
  map.set(key, newValue);
};

export enum SortDirection {
  Ascending,
  Descending,
}

export const numericalSort = (
  array: number[],
  direction = SortDirection.Ascending
) => {
  const sortFunction =
    direction === SortDirection.Ascending ? (a, b) => a - b : (a, b) => b - a;
  return array.sort(sortFunction);
};