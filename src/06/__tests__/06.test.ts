import {
  findMarkerPosition,
  findStartOfMessagePosition,
  part1,
  part2,
} from "../06";

describe("Dec 06", () => {
  describe("Part 1", () => {
    it.each([
      ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
      ["nppdvjthqldpwncqszvftbrmjlhg", 6],
      ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
      ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
    ])("identifies the marker position of %s as %i", (sequence, position) => {
      expect(findMarkerPosition(sequence)).toEqual(position);
    });

    it("identifies the marker position for the data as 1896", () => {
      expect(part1("src/06/data/data.txt")).toEqual(1896);
    });
  });

  describe("Part 2", () => {
    it.each([
      ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
      ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
      ["nppdvjthqldpwncqszvftbrmjlhg", 23],
      ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
      ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
    ])("identifies the marker position of %s as %i", (sequence, position) => {
      expect(findStartOfMessagePosition(sequence)).toEqual(position);
    });

    it("identifies the marker position for the data as 3452", () => {
      expect(part2("src/06/data/data.txt")).toEqual(3452);
    });
  });
});
