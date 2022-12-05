import * as fs from "fs";
import { upsert } from "../utils";

// const data = fs.readFileSync('./src/05/data/data.txt').toString()

interface MoveCommand {
  from: number;
  to: number;
  amount: number;
}

const parseStackLine = (line: RegExpMatchArray): string[] => {
  if (line === null) {
    return null;
  }

  const withoutFullMatch = line.slice(1);
  const withoutFullMatchTrimmed = withoutFullMatch.map((item) => item.trim());

  return withoutFullMatchTrimmed;
};

const buildStacks = (lines: string[][]): Map<number, string[]> => {
  const stackMap = new Map<number, string[]>();

  lines.forEach((stackLine: string[]) => {
    if (stackLine === null) return;
    stackLine.forEach((item, index) => {
      if (item === "") return;
      upsert(stackMap, index, (_key, previous) => {
        if (previous === undefined) {
          return [item];
        } else {
          const updated = [...previous];
          updated.unshift(item);
          return updated;
        }
      });
    });
  });

  return stackMap;
};

export const parseStacks = (data: string): Map<number, string[]> => {
  const lines = data.split("\n");

  const stackMatcher = /(...).(...).(...)/;

  const matched = [...lines.map((line) => line.match(stackMatcher))];

  const parsedLines = matched.map(parseStackLine);
  const stacks = buildStacks(parsedLines);

  return stacks;
};

const parseMoveLine = (line: string): MoveCommand => {
  const matcher = /move (\d+) from (\d+) to (\d+)/;
  const [_fullMatch, amount, from, to] = [...line.match(matcher)];

  return { from: parseInt(from), to: parseInt(to), amount: parseInt(amount) };
};

export const parseMoves = (data: string): MoveCommand[] => {
  const lines = data.split("\n");

  return lines.map(parseMoveLine);
};
