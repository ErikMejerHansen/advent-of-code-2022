import {
  findMaximum,
  findMinimum,
  manhattanDistance,
  readLines,
  Vector2D,
} from "../utils";

export interface Sensor {
  position: Vector2D;
  beacon: Vector2D;
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

  return { position, range, beacon: beaconPosition };
};

export const parse = (fileName: string) => readLines(fileName).map(parseLine);

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

export const inRange = (position: Vector2D, sensors: Sensor[]) => {
  const sensorsInRange = sensors.filter((sensor) => {
    const distance = manhattanDistance(position, sensor.position);
    return distance <= sensor.range;
  });

  return sensorsInRange.length > 0;
};

export const hasBeacon = (position: Vector2D, sensors: Sensor[]): boolean => {
  const beaconOverlaps = sensors.filter((sensor) => {
    return sensor.beacon[0] === position[0] && sensor.beacon[1] === position[1];
  });

  return beaconOverlaps.length > 0;
};

export const getSpanningCoordinates = (
  sensors: Sensor[]
): [Vector2D, Vector2D] => {
  const minX = findMinimum(
    sensors.map((sensor) => [sensor.position[0], sensor.beacon[0]]).flat()
  );

  const maxX = findMaximum(
    sensors.map((sensor) => [sensor.position[0], sensor.beacon[0]]).flat()
  );

  const minY = findMinimum(
    sensors.map((sensor) => [sensor.position[1], sensor.beacon[1]]).flat()
  );

  const maxY = findMaximum(
    sensors.map((sensor) => [sensor.position[1], sensor.beacon[1]]).flat()
  );

  return [
    [minX, minY],
    [maxX, maxY],
  ];
};

export const part1 = (fileName: string, row: number): number => {
  const sensors = parse(fileName);
  const [[minX], [maxX]] = getSpanningCoordinates(sensors);

  const maxRange = maximumRange(sensors);
  const sensorsFilteredForYRange = sensors.filter((sensor) => {
    const [_, y] = sensor.position;
    return y - maxRange <= row && row <= y + maxRange;
  });

  const rowSensorCoverage = new Array<boolean>();

  for (let x = minX; x < maxX; x++) {
    const sensorsFilteredForXRange = sensorsFilteredForYRange.filter(
      (sensor) => {
        const [xSensor, _] = sensor.position;
        return xSensor - maxRange <= x && x <= xSensor + maxRange;
      }
    );
    const position: Vector2D = [x, row];
    const cannotHaveBeacon =
      inRange(position, sensorsFilteredForXRange) &&
      !hasBeacon(position, sensorsFilteredForXRange);
    rowSensorCoverage.push(cannotHaveBeacon);
  }

  return rowSensorCoverage.filter(Boolean).length;
};
