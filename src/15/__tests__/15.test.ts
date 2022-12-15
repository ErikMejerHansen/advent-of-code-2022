import { buildLookUpMap, parse, parseLine, Sensor } from "../15";

describe("Dec 15", () => {
  describe("parsing", () => {
    it("can parse a line into a sensor", () => {
      const sensor = parseLine(
        "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"
      );
      const expectedSensor = { position: [2, 18], range: 7 };

      expect(sensor).toEqual(expectedSensor);
    });

    it("parsing the example data returns 14 sensors", () => {
      const sensors = parse("src/15/__tests__/test-data.txt");

      expect(sensors).toHaveLength(14);
    });
  });

  describe("sensor lookup structure", () => {
    it("can build a map from x-coordinate to sensors at that x-coord", () => {
      const sensor1: Sensor = { position: [2, 18], range: 7 };
      const sensor2: Sensor = { position: [-2, 18], range: 7 };

      const sensorLookUp = buildLookUpMap([sensor1, sensor2]);

      expect(sensorLookUp.get(sensor1.position[0])).not.toBeUndefined();
      expect(sensorLookUp.get(sensor2.position[0])).not.toBeUndefined();
    });
  });
  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
