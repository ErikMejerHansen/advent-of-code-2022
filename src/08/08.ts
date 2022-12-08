// import * as fs from 'fs'

// const data = fs.readFileSync('./src/08/data/data.txt').toString()

export const parse = (input: string) => {
  const treeHights = input
    .split("\n")
    .map((line) => line.split("").map((height) => parseInt(height)));
  return treeHights;
};
