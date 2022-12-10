// import * as fs from "fs";

// const data = fs.readFileSync("./src/10/data/data.txt").toString();

interface Instruction {
  opcode: "noop" | "addx";
  cycles: 1 | 2;
  argument?: number;
}

export const parseCommand = (command: string): Instruction => {
  if (command === "noop") {
    const opcode = "noop";
    return { opcode, cycles: 1 };
  } else {
    const [_opcode, argument] = command.split(" ");
    return { opcode: "addx", cycles: 2, argument: parseInt(argument) };
  }
};
