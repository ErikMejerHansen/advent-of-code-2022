import { buildTree, Command, DirectoryItem, parseData, parseLine } from "../07";

describe("Dec 07", () => {
  const command = (type: Command, destination: string = null) => {
    if (destination === null) {
      return { type };
    } else {
      return { type, destination };
    }
  };

  const dirLine = (type: DirectoryItem, name: string, size = 0) => ({
    type,
    name,
    size,
  });

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
      ).toEqual({ name: "/", children: [{ name: "b.txt", size: 210 }] });
    });

    it.only("can construct a tree with root and a sub-tree", () => {
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
        children: [
          {
            name: "b",
            children: [
              { name: "c.txt", size: 210 },
              { name: "e.txt", size: 10 },
            ],
          },
        ],
      });
    });

    it("can construct a tree with root and two sub-trees", () => {
      expect(
        buildTree([
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
        ])
      ).toEqual({
        name: "/",
        children: [
          { name: "b", children: [{ name: "c.txt", size: 210 }] },
          { name: "e", children: [{ name: "f.txt", size: 210 }] },
        ],
      });
    });
  });

  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
