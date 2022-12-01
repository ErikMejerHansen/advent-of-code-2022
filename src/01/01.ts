import * as fs from "fs";
import { findMaximum, parseStringArrayToNumberArray } from "../utils";

export const parseData = (fileName: string) => {
  const data = fs.readFileSync(fileName).toString();
  const groupedStrings = groupByEmptyLine(data);

  return groupedStrings.map(parseStringArrayToNumberArray);
};

export const splitByEmptyLine = (data: string) => data.split("\n\n");

export const groupByEmptyLine = (data: string) => {
  const groups = splitByEmptyLine(data);

  return groups.map((group: string) => group.split("\n"));
};

export const part1 = (fileName) => {
  const parsed = parseData(fileName);
  const summed = parsed.map((group) => group.reduce((acc, curr) => acc + curr));

  return findMaximum(summed);
};

export const part2 = (fileName) => {
  const parsed = parseData(fileName);
  const summed = parsed.map((group) => group.reduce((acc, curr) => acc + curr));
  const [first, second, third, _rest] = summed.sort((a, b) => a - b).reverse();

  return first + second + third;
};
