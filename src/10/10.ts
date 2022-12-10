import { readLines } from "../utils";

interface Instruction {
  opcode: "noop" | "addx";
  cycles: 1 | 2;
  argument?: number;
}

export const parseInstruction = (command: string): Instruction => {
  if (command === "noop") {
    const opcode = "noop";
    return { opcode, cycles: 1 };
  } else {
    const [_opcode, argument] = command.split(" ");
    return { opcode: "addx", cycles: 2, argument: parseInt(argument) };
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
