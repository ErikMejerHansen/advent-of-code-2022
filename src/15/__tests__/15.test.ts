import {
  buildLookUpMap,
  getSpanningCoordinates,
  inRange,
  parse,
  parseLine,
  part1,
  part2,
  Sensor,
} from "../15";

describe("Dec 15", () => {
  describe("parsing", () => {
    it("can parse a line into a sensor", () => {
      const sensor = parseLine(
        "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"
      );
      const expectedSensor = { position: [2, 18], range: 7, beacon: [-2, 15] };

      expect(sensor).toEqual(expectedSensor);
    });

    it("parsing the example data returns 14 sensors", () => {
      const sensors = parse("src/15/__tests__/test-data.txt");

      expect(sensors).toHaveLength(14);
    });
  });

  describe("sensor lookup structure", () => {
    it("can build a map from x-coordinate to a map of y-coordinate => sensor", () => {
      const sensor1: Sensor = { position: [2, 18], range: 7, beacon: [8, 19] };
      const sensor2: Sensor = {
        position: [-2, 18],
        range: 7,
        beacon: [-8, 18],
      };

      const sensorLookUp = buildLookUpMap([sensor1, sensor2]);

      expect(sensorLookUp.get(sensor1.position[0])).not.toBeUndefined();
      expect(sensorLookUp.get(sensor2.position[0])).not.toBeUndefined();

      expect(
        sensorLookUp.get(sensor1.position[0]).get(sensor1.position[1])
      ).toBe(sensor1);
    });

    it("can handle multiple sensors with the same x-coordinate", () => {
      const sensor1: Sensor = { position: [2, 18], range: 7, beacon: [8, 19] };
      const sensor2: Sensor = { position: [2, 10], range: 7, beacon: [2, 17] };

      const sensorLookUp = buildLookUpMap([sensor1, sensor2]);

      expect(sensorLookUp.get(sensor1.position[0]).size).toEqual(2);
    });
  });

  describe("Part 1", () => {
    it("can tell if a coordinate is within range of a sensor", () => {
      const sensor1: Sensor = { position: [2, 18], range: 10, beacon: [0, 0] };
      const sensor2: Sensor = { position: [2, 10], range: 7, beacon: [0, 0] };

      expect(inRange([2, 20], [sensor1, sensor2])).toBe(true);
      expect(inRange([2, 40], [sensor1, sensor2])).toBe(false);
    });

    it("can find the spanning coordinates for the example data", () => {
      const sensors = parse("src/15/__tests__/test-data.txt");

      const [upperLeft, lowerRight] = getSpanningCoordinates(sensors);

      expect(upperLeft).toEqual([-8, 0]);
      expect(lowerRight).toEqual([28, 26]);
    });

    test("for the sample data it finds 26 positions in row 26 where a beacon can't be", () => {
      expect(part1("src/15/__tests__/test-data.txt", 9)).toEqual(24);
      expect(part1("src/15/__tests__/test-data.txt", 10)).toEqual(26);
      expect(part1("src/15/__tests__/test-data.txt", 11)).toEqual(27);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("finds 4_665_948 positions in row 2_000_000 where a beacon can't be", () => {
      expect(part1("src/15/data/data.txt", 2_000_000)).toEqual(4_665_948);
    });
  });
  describe("Part 2", () => {
    it("calculates the score of the example as 56_000_011", () => {
      expect(part2("src/15/__tests__/test-data.txt", 20)).toEqual(56_000_011);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("calculates the score as", () => {
      expect(part2("src/15/data/data.txt", 4_000_000)).toEqual(56_000_011);
    });
  });
});
