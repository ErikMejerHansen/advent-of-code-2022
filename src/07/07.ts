// import * as fs from 'fs'

// const data = fs.readFileSync('./src/07/data/data.txt').toString()
export enum Command {
  CHANGE_DIR = "$ cd",
  LIST_DIR = "$ ls",
}

export enum DirectoryItem {
  Directory,
  File,
}

const parseCommand = (
  line: string
): { type: Command; destination?: string } => {
  const [_commandToken, command, destination] = line.split(" ");
  switch (command) {
    case "cd":
      return { type: Command.CHANGE_DIR, destination };
    case "ls":
      return { type: Command.LIST_DIR };
  }
};

const parseDirectoryListing = (
  line: string
): { type: DirectoryItem; name: string; size: number } => {
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
