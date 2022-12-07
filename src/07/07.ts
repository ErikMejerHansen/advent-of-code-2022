// import * as fs from 'fs'

import { readLines } from "../utils";

// const data = fs.readFileSync('./src/07/data/data.txt').toString()
export enum Command {
  CHANGE_DIR = "$ cd",
  LIST_DIR = "$ ls",
}

export enum DirectoryItem {
  Directory,
  File,
}

type CommandLine = { type: Command; destination?: string };
type DirectoryListingLine = { type: DirectoryItem; name: string; size: number };

const parseCommand = (line: string): CommandLine => {
  const [_commandToken, command, destination] = line.split(" ");
  switch (command) {
    case "cd":
      return { type: Command.CHANGE_DIR, destination };
    case "ls":
      return { type: Command.LIST_DIR };
  }
};

const parseDirectoryListing = (line: string): DirectoryListingLine => {
  if (line.startsWith("dir")) {
    const [_directoryToken, name] = line.split(" ");
    return { type: DirectoryItem.Directory, name: name, size: 0 };
  } else {
    const [size, name] = line.split(" ");
    return { type: DirectoryItem.File, name: name, size: parseInt(size) };
  }
};

export const parseLine = (
  line: string
):
  | { type: Command; destination?: string }
  | { type: DirectoryItem; name: string; size: number } => {
  if (line.startsWith("$")) {
    return parseCommand(line);
  } else {
    return parseDirectoryListing(line);
  }
};

export const parseData = (
  fileName: string
): (CommandLine | DirectoryListingLine)[] => readLines(fileName).map(parseLine);

interface Tree {
  name: string;
  children: Array<Tree | Leaf>;
}
interface Leaf {
  name: string;
  size: number;
}

const addChild = (item: CommandLine | DirectoryListingLine, parent: Tree) => {
  if (item.type === DirectoryItem.File) {
    parent.children.push({ name: item.name, size: item.size });
  }
};

export const buildTree = (
  input: (CommandLine | DirectoryListingLine)[]
): Tree => {
  input.shift(); // first line is always cd /
  const root: Tree = { name: "/", children: [] };
  input.shift(); // Second item is ls of root dir

  addChild(input.shift(), root);
  return root;
};
