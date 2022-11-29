import * as fs from "fs";

export const parseDataToNumberArray = (fileName: string) => {
  const buffer = fs.readFileSync(fileName);
  return buffer
    .toString()
    .split("\n")
    .map((it) => parseFloat(it));
};

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
  updater: (_previous?: V) => V,
  verbose = false
) => {
  if (verbose) {
    console.log("Upsert:", key, "into:", map);
  }
  const newValue = updater(map.get(key));
  map.set(key, newValue);
};
