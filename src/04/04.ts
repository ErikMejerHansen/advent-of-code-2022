import { parseStringArrayToNumberArray, readLines } from "../utils";

type Assignment = [number, number];

export const fullyOverlaps = (a: Assignment, b: Assignment): boolean =>
  (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);

export const partialOverlaps = (a: Assignment, b: Assignment): boolean =>
  fullyOverlaps(a, b) ||
  (a[0] >= b[0] && a[1] >= b[1] && a[0] <= b[1]) ||
  (a[0] <= b[0] && a[1] >= b[0]);

const parseAssignment = (assignment: string): Assignment =>
  parseStringArrayToNumberArray(assignment.split("-")) as Assignment;

export const parseLine = (line: string): [Assignment, Assignment] =>
  line.split(",").map(parseAssignment) as [Assignment, Assignment];

const parseData = (filename: string): [Assignment, Assignment][] => {
  const data = readLines(filename);
  const assignmentPairs = data.map(parseLine);

  return assignmentPairs;
};

export const part1 = (filename: string): number => {
  const assignmentPairs = parseData(filename);
  const overlaps = assignmentPairs.filter((pair) => fullyOverlaps(...pair));

  return overlaps.length;
};

export const part2 = (filename: string): number => {
  const assignmentPairs = parseData(filename);
  const overlaps = assignmentPairs.filter((pair) => partialOverlaps(...pair));

  return overlaps.length;
};
