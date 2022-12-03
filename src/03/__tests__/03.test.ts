import { toSet } from "../../utils";
import {
  chunkInThrees,
  intersection,
  intersection3,
  scoreItem,
  scorePart1,
  scorePart2,
  splitInHalves,
} from "../03";

describe("Dec 03", () => {
  describe("Part 1", () => {
    it("can split the input string halves", () => {
      expect(splitInHalves("aAAa")).toEqual(["aA", "Aa"]);
      expect(splitInHalves("pFfahA")).toEqual(["pFf", "ahA"]);
    });

    it("can find the shared item", () => {
      const halves = splitInHalves("vJrwpWtwJgWrhcsFMMfFFhFp");
      const [setA, setB] = halves.map(toSet);

      expect(intersection(setA, setB)).toContain("p");
    });

    it("can calculate the priority score", () => {
      expect(scoreItem("a")).toEqual(1);
      expect(scoreItem("s")).toEqual(19);
      expect(scoreItem("t")).toEqual(20);
      expect(scoreItem("v")).toEqual(22);
      expect(scoreItem("z")).toEqual(26);

      expect(scoreItem("A")).toEqual(27);
      expect(scoreItem("L")).toEqual(38);
      expect(scoreItem("P")).toEqual(42);
      expect(scoreItem("Z")).toEqual(52);
    });

    it("calculates the score of the sample input as 157", () => {
      expect(scorePart1("src/03/__tests__/test-data.txt")).toEqual(157);
    });

    it("calculates the score of the input as 8252", () => {
      expect(scorePart1("src/03/data/data.txt")).toEqual(8252);
    });
  });

  describe("Part 2", () => {
    it("can chunk arrays in to threes", () => {
      expect(chunkInThrees([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it("can find the intersection of three sets", () => {
      const setA = toSet("vJrwpWtwJgWrhcsFMMfFFhFp");
      const setB = toSet("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL");
      const setC = toSet("PmmdzqPrVvPwwTWBwg");

      expect(intersection3(setA, setB, setC)).toContain("r");
    });

    it("calculates the score of the sample input as 70", () => {
      expect(scorePart2("src/03/__tests__/test-data.txt")).toEqual(70);
    });

    it("calculates the score of the input as 2828", () => {
      expect(scorePart2("src/03/data/data.txt")).toEqual(2828);
    });
  });
});
