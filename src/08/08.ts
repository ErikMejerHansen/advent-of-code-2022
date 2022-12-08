import * as fs from "fs";

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

    return trees[index - 1] < tree;
  }, []);

export const evaluateRowVisibility = (trees: number[]): boolean[] => {
  const fromLeft = leftToRightVisibility(trees);
  const fromRight = leftToRightVisibility(trees.reverse());

  return fromLeft.map((isVisible, index) => isVisible || fromRight[index]);
};
