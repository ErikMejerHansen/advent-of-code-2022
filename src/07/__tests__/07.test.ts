import { Command, DirectoryItem, parseLine } from "../07";

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
  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
