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
  const fromRight = leftToRightVisibility([...trees].reverse()).reverse();

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

export const leftViewDistances = (row: number[]): number[] => {
  return row.map((tree, index) => {
    if (index === 0) return 0;

    const treeOrderWhenLookingLeft = row.slice(0, index).reverse();

    for (let i = 0; i < treeOrderWhenLookingLeft.length; i++) {
      if (treeOrderWhenLookingLeft[i] >= tree) {
        return i + 1;
      }
    }
    return index;
  });
};

export const rightViewDistances = (row: number[]): number[] => {
  return leftViewDistances([...row].reverse()).reverse();
};

export const rowVisibilityScore = (row: number[]): number[] => {
  const leftViewScore = leftViewDistances(row);
  const rightViewScore = rightViewDistances(row);

  return leftViewScore.map((score, index) => score * rightViewScore[index]);
};

export const viewScores = (trees: number[][]): number[][] => {
  const rowViewScores = trees.map(rowVisibilityScore);
  const transposedTrees = transpose(trees);
  const columnViewScores = transpose(transposedTrees.map(rowVisibilityScore));

  const scores = rowViewScores.map((row, rowIndex) =>
    row.map((score, colIndex) => score * columnViewScores[rowIndex][colIndex])
  );

  return scores;
};

export const part2 = (fileName: string): number => {
  const trees = parseFile(fileName);
  const scores = viewScores(trees);

  return max(scores.flat());
};
