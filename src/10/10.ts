import { readLines } from "../utils";

interface Instruction {
  opcode: "noop" | "addx";
  argument?: number;
}

export const parseInstruction = (command: string): Instruction => {
  if (command === "noop") {
    const opcode = "noop";
    return { opcode };
  } else {
    const [_opcode, argument] = command.split(" ");
    return { opcode: "addx", argument: parseInt(argument) };
  }
};

export const runInstruction = (
  instruction: Instruction,
  registerState: Record<"x", number>
): Record<"x", number>[] => {
  if (instruction.opcode === "noop") {
    return [registerState];
  } else {
    const argument = instruction.argument;
    return [registerState, { x: registerState.x + argument }];
  }
};

export const buildRegisterHistory = (
  fileName: string
): Record<"x", number>[] => {
  const instructions = readLines(fileName).map(parseInstruction);

  const registerHistory = [];
  instructions.reduce(
    (registerState, instruction) => {
      const registerStates = runInstruction(instruction, registerState);
      registerHistory.push(...registerStates);

      return registerStates[registerStates.length - 1];
    },
    { x: 1 }
  );

  return registerHistory;
};

export const part1 = (fileName: string): number => {
  const registerHistory = buildRegisterHistory(fileName);

  return (
    registerHistory[18].x * 20 +
    registerHistory[58].x * 60 +
    registerHistory[98].x * 100 +
    registerHistory[138].x * 140 +
    registerHistory[178].x * 180 +
    registerHistory[218].x * 220
  );
};

const drawLine = (history: Record<"x", number>[]): string => {
  return history
    .map(({ x }, i) => {
      if (x - 1 === i || x + 1 === i || x === i) {
        return "#";
      } else {
        return ".";
      }
    })
    .join("");
};

export const draw = (history: Record<"x", number>[]): string => {
  history.unshift(history[0]);
  const line1 = history.slice(0, 40);
  const line2 = history.slice(40, 80);
  const line3 = history.slice(80, 120);
  const line4 = history.slice(120, 160);
  const line5 = history.slice(160, 200);
  const line6 = history.slice(200, 240);

  return [line1, line2, line3, line4, line5, line6].map(drawLine).join("\n");
};
