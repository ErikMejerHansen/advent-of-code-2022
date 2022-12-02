import * as fs from "fs";
import {
  findMaximum,
  numericalSort,
  parseStringArrayToNumberArray,
  SortDirection,
} from "../utils";

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
  const [first, second, third] = numericalSort(
    summed,
    SortDirection.Descending
  );

  return first + second + third;
};
