import { findMarkerPosition, part1 } from "../06";

describe("Dec 06", () => {
  describe("Part 1", () => {
    it.each([
      ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
      ["nppdvjthqldpwncqszvftbrmjlhg", 6],
      ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
      ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
    ])("identifies the marker position as %i", (sequence, position) => {
      expect(findMarkerPosition(sequence)).toEqual(position);
    });

    it("identifies the marker position for the data as X", () => {
      expect(part1("src/06/data/data.txt")).toEqual(10);
    });
  });

  describe("Part 2", () => {
    //
  });
});
