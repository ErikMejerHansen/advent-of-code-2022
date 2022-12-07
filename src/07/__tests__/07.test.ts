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
    it("can construct a tree with a root", () => {
      expect(
        buildTree([{ type: Command.CHANGE_DIR, destination: "/" }])
      ).toEqual([[{ type: DirectoryItem.Directory, name: "/", size: 0 }]]);
    });
  });

  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
