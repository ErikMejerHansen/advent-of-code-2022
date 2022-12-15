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
    it("can build a map from x-coordinate to a map of y-coordinate => sensor", () => {
      const sensor1: Sensor = { position: [2, 18], range: 7 };
      const sensor2: Sensor = { position: [-2, 18], range: 7 };

      const sensorLookUp = buildLookUpMap([sensor1, sensor2]);

      expect(sensorLookUp.get(sensor1.position[0])).not.toBeUndefined();
      expect(sensorLookUp.get(sensor2.position[0])).not.toBeUndefined();

      expect(
        sensorLookUp.get(sensor1.position[0]).get(sensor1.position[1])
      ).toBe(sensor1);
    });

    it("can handle multiple sensors with the same x-coordinate", () => {
      const sensor1: Sensor = { position: [2, 18], range: 7 };
      const sensor2: Sensor = { position: [2, 10], range: 7 };

      const sensorLookUp = buildLookUpMap([sensor1, sensor2]);

      expect(sensorLookUp.get(sensor1.position[0]).size).toEqual(2);
    });
  });
  describe("Part 1", () => {
    //
  });

  describe("Part 2", () => {
    //
  });
});
