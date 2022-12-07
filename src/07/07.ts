import { numericalSort, readLines, sum } from "../utils";

export enum Command {
  CHANGE_DIR = "$ cd",
  LIST_DIR = "$ ls",
}

export enum DirectoryItem {
  Directory = "directory",
  File = "file",
}

type TreeNode = Tree | Leaf;

interface Tree {
  name: string;
  children: Array<Tree | Leaf>;
  parent: Tree;
  size: number;
  kind: "tree";
}

interface Leaf {
  name: string;
  size: number;
  kind: "leaf";
  parent: Tree;
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

export const parseLine = (line: string): CommandLine | DirectoryListingLine => {
  if (line.startsWith("$")) {
    return parseCommand(line);
  } else {
    return parseDirectoryListing(line);
  }
};

export const parseData = (
  fileName: string
): (CommandLine | DirectoryListingLine)[] => readLines(fileName).map(parseLine);

const populateDirectorySizes = (tree: Tree) => {
  if (tree.children !== undefined) {
    tree.children.forEach(populateDirectorySizes);
  }
  if (tree.parent === null) return;

  tree.parent.size = tree.parent.size + tree.size;
};

const addChild = (
  lines: (CommandLine | DirectoryListingLine)[],
  parent: Tree
) => {
  if (lines.length === 0) {
    return;
  }

  const item = lines.shift();

  if (item.type === DirectoryItem.File) {
    parent.children.push({
      name: item.name,
      size: item.size,
      parent: parent,
      kind: "leaf",
    });
    addChild(lines, parent);
  }

  if (item.type === DirectoryItem.Directory) {
    addChild(lines, parent);
  }

  if (item.type === Command.LIST_DIR) {
    addChild(lines, parent);
  }

  if (item.type === Command.CHANGE_DIR && item.destination === "..") {
    addChild(lines, parent.parent);
  }

  if (item.type === Command.CHANGE_DIR && item.destination !== "..") {
    const directoryNode: Tree = {
      name: item.destination,
      children: [],
      parent,
      size: 0,
      kind: "tree",
    };
    parent.children.push(directoryNode);
    addChild(lines, directoryNode);
  }
};

export const buildTree = (
  input: (CommandLine | DirectoryListingLine)[]
): Tree => {
  input.shift(); // first line is always cd /
  input.shift(); // Second item is ls of root dir
  const root: Tree = {
    name: "/",
    children: [],
    parent: null,
    size: 0,
    kind: "tree",
  };

  addChild(input, root);
  populateDirectorySizes(root);
  return root;
};

export const directoriesBelowLimit = (
  limit: number,
  tree: TreeNode
): number[] => {
  const sizes = directorySizes(tree);

  return sizes.filter((size) => size <= limit);
};

export const directorySizes = (
  tree: TreeNode,
  sizes: number[] = []
): number[] => {
  if (tree.kind === "tree") {
    sizes.push(tree.size);
    tree.children
      .filter((child) => child.kind === "tree")
      .map((subtree) => directorySizes(subtree, sizes));

    return sizes;
  }
};

export const parseToTree = (fileName: string): Tree => {
  const entries = parseData(fileName);
  const tree = buildTree(entries);

  return tree;
};

export const part1 = (fileName: string): number => {
  const tree = parseToTree(fileName);

  const directorySizesBelowThreshold = directoriesBelowLimit(100000, tree);

  return sum(directorySizesBelowThreshold);
};

export const spaceToFree = (tree: Tree) => {
  const totalSize = 70_000_000;
  const spaceNeeded = 30_000_000;

  const freeSpace = totalSize - tree.size;

  return spaceNeeded - freeSpace;
};

export const part2 = (fileName: string): number => {
  const tree = parseToTree(fileName);
  const spaceNeeded = spaceToFree(tree);

  const sizes = numericalSort(directorySizes(tree));

  const candidates = sizes.filter((size) => size > spaceNeeded);
  return candidates[0];
};
