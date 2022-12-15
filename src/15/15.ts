import { findMaximum, manhattanDistance, readLines, Vector2D } from "../utils";

export interface Sensor {
  position: Vector2D;
  range: number;
}

const parsePositionElement = (element: string): number => {
  const [_, position] = element.split("=");
  if (position.endsWith(":")) {
    parseInt(position.slice(0, position.length - 1));
  }
  return parseInt(position);
};

export const parseLine = (line: string): Sensor => {
  // "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"
  const [, , posX, posY, , , , , beaconX, beaconY] = line.split(" ");

  const position: Vector2D = [
    parsePositionElement(posX),
    parsePositionElement(posY),
  ];

  const beaconPosition: Vector2D = [
    parsePositionElement(beaconX),
    parsePositionElement(beaconY),
  ];

  const range = manhattanDistance(position, beaconPosition);

  return { position, range };
};

export const parse = (fileName: string) =>
  readLines(fileName).map(parsePositionElement);

type LookupMap = Map<number, Map<number, Sensor>>;

export const buildLookUpMap = (sensors: Sensor[]): LookupMap => {
  const lookupMap = new Map<number, Map<number, Sensor>>();

  for (const sensor of sensors) {
    if (lookupMap.has(sensor.position[0])) {
      const yCoordMap = lookupMap.get(sensor.position[0]);
      yCoordMap.set(sensor.position[1], sensor);
    } else {
      const yCoordMap = new Map<number, Sensor>();
      yCoordMap.set(sensor.position[1], sensor);
      lookupMap.set(sensor.position[0], yCoordMap);
    }
  }

  return lookupMap;
};

export const maximumRange = (sensors: Sensor[]) =>
  findMaximum(sensors.map((sensor) => sensor.range));
