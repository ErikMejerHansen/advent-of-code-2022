import {
  buildTree,
  Command,
  directoriesBelowLimit,
  DirectoryItem,
  directorySizes,
  parseLine,
  parseToTree,
  part1,
  part2,
  spaceToFree,
} from "../07";

describe("Dec 07", () => {
  describe("data parsing", () => {
    it("parses can parse commands", () => {
      expect(parseLine("$ cd /")).toEqual({
        type: Command.CHANGE_DIR,
        destination: "/",
      });

      expect(parseLine("$ cd e")).toEqual({
        type: Command.CHANGE_DIR,
        destination: "e",
      });

      expect(parseLine("$ ls")).toEqual({
        type: Command.LIST_DIR,
      });
    });

    it("parses can directory listing", () => {
      expect(parseLine("dir a")).toEqual({
        type: DirectoryItem.Directory,
        name: "a",
        size: 0,
      });
      expect(parseLine("8504156 c.dat")).toEqual({
        type: DirectoryItem.File,
        name: "c.dat",
        size: 8504156,
      });
    });
  });

  describe("tree construction", () => {
    it("can construct a tree with root and one leaf", () => {
      expect(
        buildTree([
          { type: Command.CHANGE_DIR, destination: "/" },
          { type: Command.LIST_DIR },
          { type: DirectoryItem.File, name: "b.txt", size: 210 },
        ])
      ).toEqual({
        name: "/",
        children: [
          { name: "b.txt", size: 210, parent: expect.anything(), kind: "leaf" },
        ],
        parent: null,
        kind: "tree",
        size: expect.anything(),
      });
    });

    it("can construct a tree with root and a sub-tree", () => {
      expect(
        buildTree([
          { type: Command.CHANGE_DIR, destination: "/" },
          { type: Command.LIST_DIR },
          { type: DirectoryItem.Directory, name: "b", size: 0 },
          { type: Command.CHANGE_DIR, destination: "b" },
          { type: Command.LIST_DIR },
          { type: DirectoryItem.File, name: "c.txt", size: 210 },
          { type: DirectoryItem.File, name: "e.txt", size: 10 },
        ])
      ).toEqual({
        name: "/",
        parent: null,
        size: expect.anything(),
        kind: "tree",
        children: [
          {
            name: "b",
            parent: expect.anything(),
            size: expect.anything(),
            kind: "tree",
            children: [
              {
                name: "c.txt",
                size: 210,
                parent: expect.anything(),
                kind: "leaf",
              },
              {
                name: "e.txt",
                size: 10,
                parent: expect.anything(),
                kind: "leaf",
              },
            ],
          },
        ],
      });
    });

    it("can construct a tree with root and two sub-trees", () => {
      const tree = buildTree([
        { type: Command.CHANGE_DIR, destination: "/" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "b", size: 0 },
        { type: Command.CHANGE_DIR, destination: "b" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "c.txt", size: 210 },
        { type: Command.CHANGE_DIR, destination: ".." },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "e", size: 0 },
        { type: Command.CHANGE_DIR, destination: "e" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "f.txt", size: 100 },
      ]);

      expect(tree).toEqual({
        name: "/",
        children: [
          {
            name: "b",
            size: expect.anything(),
            children: [
              {
                name: "c.txt",
                size: 210,
                parent: expect.anything(),
                kind: "leaf",
              },
            ],
            parent: expect.anything(),
            kind: "tree",
          },
          {
            name: "e",
            size: expect.anything(),
            children: [
              {
                name: "f.txt",
                size: 100,
                parent: expect.anything(),
                kind: "leaf",
              },
            ],
            parent: expect.anything(),
            kind: "tree",
          },
        ],
        parent: null,
        size: expect.anything(),
        kind: "tree",
      });
    });

    it("calculates the directory sizes for root with two leaves", () => {
      const tree = buildTree([
        { type: Command.CHANGE_DIR, destination: "/" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "b.txt", size: 210 },
        { type: DirectoryItem.File, name: "d.txt", size: 100 },
      ]);

      expect(tree.size).toEqual(310);
    });

    it("calculates the directory sizes for root with two sub-trees", () => {
      const tree = buildTree([
        { type: Command.CHANGE_DIR, destination: "/" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "b", size: 0 },
        { type: Command.CHANGE_DIR, destination: "b" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "c.txt", size: 210 },
        { type: Command.CHANGE_DIR, destination: ".." },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "e", size: 0 },
        { type: Command.CHANGE_DIR, destination: "e" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "f.txt", size: 400 },
      ]);

      expect(tree.size).toEqual(610);
      expect(tree.children[0].size).toEqual(210);
      expect(tree.children[1].size).toEqual(400);
    });
  });

  describe("Part 1", () => {
    it("can find directories below size limit", () => {
      const tree = buildTree([
        { type: Command.CHANGE_DIR, destination: "/" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "b", size: 0 },
        { type: Command.CHANGE_DIR, destination: "b" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "c.txt", size: 200 },
        { type: Command.CHANGE_DIR, destination: ".." },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "e", size: 0 },
        { type: Command.CHANGE_DIR, destination: "e" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "f.txt", size: 400 },
      ]);

      expect(directoriesBelowLimit(200, tree)).toHaveLength(1);
      expect(directoriesBelowLimit(400, tree)).toHaveLength(2);
      expect(directoriesBelowLimit(1000, tree)).toHaveLength(3);
    });

    it("calculates the part 1 example size as 95437", () => {
      expect(part1("src/07/__tests__/test-data.txt")).toEqual(95437);
    });

    it("calculates the part 1 size as 95437", () => {
      expect(part1("src/07/data/data.txt")).toEqual(1915606);
    });
  });

  describe("Part 2", () => {
    it("calculates the amount of free space to free up", () => {
      const tree = parseToTree("src/07/__tests__/test-data.txt");
      expect(spaceToFree(tree)).toEqual(8381165);
    });

    it("can find directories sizes", () => {
      const tree = buildTree([
        { type: Command.CHANGE_DIR, destination: "/" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "b", size: 0 },
        { type: Command.CHANGE_DIR, destination: "b" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "c.txt", size: 200 },
        { type: Command.CHANGE_DIR, destination: ".." },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.Directory, name: "e", size: 0 },
        { type: Command.CHANGE_DIR, destination: "e" },
        { type: Command.LIST_DIR },
        { type: DirectoryItem.File, name: "f.txt", size: 400 },
      ]);

      expect(directorySizes(tree)).toEqual([600, 200, 400]);
    });

    it("calculates the freed up space for part 2 sample data as 24933642", () => {
      expect(part2("src/07/__tests__/test-data.txt")).toEqual(24933642);
    });

    it("calculates the freed up space for part 2 as 5025657", () => {
      expect(part2("src/07/data/data.txt")).toEqual(5025657);
    });
  });
});
