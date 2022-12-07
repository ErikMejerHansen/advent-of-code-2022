import { buildTree, Command, DirectoryItem, parseLine } from "../07";

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
        children: [{ name: "b.txt", size: 210, parent: expect.anything() }],
        parent: null,
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
        children: [
          {
            name: "b",
            parent: expect.anything(),
            size: expect.anything(),
            children: [
              { name: "c.txt", size: 210, parent: expect.anything() },
              { name: "e.txt", size: 10, parent: expect.anything() },
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
            children: [{ name: "c.txt", size: 210, parent: expect.anything() }],
            parent: expect.anything(),
          },
          {
            name: "e",
            size: expect.anything(),
            children: [{ name: "f.txt", size: 100, parent: expect.anything() }],
            parent: expect.anything(),
          },
        ],
        parent: null,
        size: expect.anything(),
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
    //
  });

  describe("Part 2", () => {
    //
  });
});
