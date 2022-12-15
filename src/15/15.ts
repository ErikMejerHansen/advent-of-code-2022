import { manhattanDistance, readLines, Vector2D } from "../utils";

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

export const buildLookUpMap = (sensors: Sensor[]) => {
  const lookupMap = new Map<number, Sensor>();

  for (const sensor of sensors) {
    lookupMap.set(sensor.position[0], sensor);
  }

  return lookupMap;
};
