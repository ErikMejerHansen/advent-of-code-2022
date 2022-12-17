import { Jet, parseJet, parseJets } from "../17";

describe("Dec 17", () => {
  describe("parsing", () => {
    it("can parse a jet direction", () => {
      expect(parseJet("<")).toEqual(Jet.Left);
      expect(parseJet(">")).toEqual(Jet.Right);
    });

    it("can parse a series of jets", () => {
      expect(parseJets("<<>")).toEqual([Jet.Left, Jet.Left, Jet.Right]);
    });
  });
  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
