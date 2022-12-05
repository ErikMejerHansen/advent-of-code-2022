import * as fs from "fs";
import { upsert } from "../utils";

interface MoveCommand {
  from: number;
  to: number;
  amount: number;
}

type StackMap = Map<number, string[]>;

const parseStackLine = (line: RegExpMatchArray): string[] => {
  if (line === null) {
    return null;
  }

  const withoutFullMatch = line.slice(1);
  const withoutFullMatchTrimmed = withoutFullMatch.map((item) => item.trim());

  return withoutFullMatchTrimmed;
};

const buildStacks = (lines: string[][]): StackMap => {
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

export const parseStacks = (data: string): StackMap => {
  const lines = data.split("\n");

  const stackMatcher = /(...).(...).(...).(...).(...).(...).(...).(...).(...)/;

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

export const executeMove = (
  stacks: StackMap,
  { to, from, amount }: MoveCommand
) => {
  const clonedMap = new Map(stacks);

  const sourceStack = clonedMap.get(from - 1);
  const targetStack = clonedMap.get(to - 1);
  for (let i = 0; i < amount; i++) {
    const item = sourceStack.pop();
    targetStack.push(item);
  }

  return clonedMap;
};

export const executeOrderRetainingMove = (
  stacks: StackMap,
  { to, from, amount }: MoveCommand
) => {
  const clonedMap = new Map(stacks);

  const sourceStack = clonedMap.get(from - 1);
  const targetStack = clonedMap.get(to - 1);
  const pickedUp = [];
  for (let i = 0; i < amount; i++) {
    const item = sourceStack.pop();
    pickedUp.push(item);
  }
  targetStack.push(...pickedUp.reverse());

  return clonedMap;
};

const getStackMessage = (stacks: StackMap): string => {
  const numberOfStacks = stacks.size;
  let message = "";
  for (let i = 0; i < numberOfStacks; i++) {
    message = message.concat(stacks.get(i).pop());
  }

  const cleanedUpMessage = message.replaceAll("[", "").replaceAll("]", "");
  return cleanedUpMessage;
};

const executeMoves = (
  stacks: StackMap,
  moves: MoveCommand[],
  movementFunction: (stacks: StackMap, move: MoveCommand) => StackMap
) => {
  const finalStack = moves.reduce((stacks, move) => {
    return movementFunction(stacks, move);
  }, stacks);

  return finalStack;
};

const prepareData = (
  movesFileName: string,
  stacksFileName: string
): [StackMap, MoveCommand[]] => {
  const movesData = fs.readFileSync(movesFileName).toString();
  const stacksData = fs.readFileSync(stacksFileName).toString();

  const stacks = parseStacks(stacksData);
  const moves = parseMoves(movesData);

  return [stacks, moves];
};

export const part1 = (
  movesFileName: string,
  stacksFileName: string
): string => {
  const [stacks, moves] = prepareData(movesFileName, stacksFileName);
  const finalStack = executeMoves(stacks, moves, executeMove);

  return getStackMessage(finalStack);
};

export const part2 = (
  movesFileName: string,
  stacksFileName: string
): string => {
  const [stacks, moves] = prepareData(movesFileName, stacksFileName);
  const finalStack = executeMoves(stacks, moves, executeOrderRetainingMove);

  return getStackMessage(finalStack);
};
