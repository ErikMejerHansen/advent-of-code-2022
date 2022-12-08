import * as fs from "fs";
import { max, transpose } from "../utils";

export const parse = (input: string) => {
  const treeHights = input
    .split("\n")
    .map((line) => line.split("").map((height) => parseInt(height)));
  return treeHights;
};

export const parseFile = (fileName: string) => {
  const contents = fs.readFileSync(fileName).toString();
  return parse(contents);
};

const leftToRightVisibility = (trees: number[]): boolean[] =>
  trees.map((tree, index) => {
    if (index === 0) return true;
    if (index === trees.length - 1) return true;

    const treesToTheLeft = trees.slice(0, index);
    const highestTreeToTheLeft = max(treesToTheLeft);
    return highestTreeToTheLeft < tree;
  }, []);

const booleanOr = (a: boolean[], b: boolean[]): boolean[] =>
  a.map((aBoolean, index) => aBoolean || b[index]);

export const evaluateRowVisibility = (trees: number[]): boolean[] => {
  const fromLeft = leftToRightVisibility([...trees]);
  const fromRight = leftToRightVisibility([...trees].reverse());

  return booleanOr(fromLeft, fromRight);
};

export const determineTreeVisibilities = (trees: number[][]): boolean[][] => {
  const rowVisibilities = trees.map(evaluateRowVisibility);
  const transposed = transpose(trees);
  const transposedColumnVisibilities = transposed.map(evaluateRowVisibility);
  const columnVisibilities = transpose(transposedColumnVisibilities);

  return rowVisibilities.map((row, index) =>
    booleanOr(row, columnVisibilities[index])
  );
};

export const part1 = (fileName: string): number => {
  const trees = parseFile(fileName);
  const visibilityMap = determineTreeVisibilities(trees);

  return visibilityMap.flat().filter((visible) => visible).length;
};
