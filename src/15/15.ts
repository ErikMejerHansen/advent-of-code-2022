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

export const inRange = (position: Vector2D, sensors: Sensor[]): boolean => {
  for (let i = 0; i < sensors.length; i++) {
    const sensor = sensors[i];
    const distance = manhattanDistance(position, sensor.position);
    if (distance <= sensor.range) {
      return true;
    }
  }
  return false;
};

export const hasBeacon = (position: Vector2D, sensors: Sensor[]): boolean => {
  for (let i = 0; i < sensors.length; i++) {
    const sensor = sensors[i];
    if (sensor.beacon[0] === position[0] && sensor.beacon[1] === position[1]) {
      return true;
    }
  }
  return false;
};

export const getSpanningCoordinates = (
  sensors: Sensor[]
): [Vector2D, Vector2D] => {
  const minX = findMinimum(
    sensors
      .map((sensor) => [sensor.position[0] - sensor.range, sensor.beacon[0]])
      .flat()
  );

  const maxX = findMaximum(
    sensors
      .map((sensor) => [sensor.position[0] + sensor.range, sensor.beacon[0]])
      .flat()
  );

  const maxY = findMaximum(
    sensors
      .map((sensor) => [sensor.position[1] + sensor.range, sensor.beacon[1]])
      .flat()
  );

  return [
    [minX, 0],
    [maxX, maxY],
  ];
};

const rowCoverage = (
  sensors: Sensor[],
  row: number,
  lowerLimit,
  upperLimit
): boolean[] => {
  const sensorsFilteredForYRange = sensors.filter((sensor) => {
    const [_, y] = sensor.position;
    return y - sensor.range <= row && row <= y + sensor.range;
  });

  const rowSensorCoverage = new Array<boolean>();

  for (let x = lowerLimit; x < upperLimit; x++) {
    const sensorsFilteredForXRange = sensorsFilteredForYRange.filter(
      (sensor) => {
        const [xSensor, _] = sensor.position;
        return xSensor - sensor.range <= x && x <= xSensor + sensor.range;
      }
    );
    const position: Vector2D = [x, row];
    const cannotHaveBeacon = inRange(position, sensorsFilteredForXRange);

    rowSensorCoverage.push(cannotHaveBeacon);
  }

  return rowSensorCoverage;
};

export const part1 = (fileName: string, row: number): number => {
  const sensors = parse(fileName);

  const [[minX], [maxX]] = getSpanningCoordinates(sensors);

  const rowSensorCoverage = rowCoverage(sensors, row, minX, maxX);
  return rowSensorCoverage.filter((it) => it).length - 1;
};

export const part2 = (fileName: string, limit: number) => {
  const sensors = parse(fileName);
  for (let y = 0; y <= limit; y++) {
    const row = rowCoverage(sensors, y, 0, limit);
    console.log("Row:", y);
    if (row.includes(false)) {
      return row.indexOf(false) * 4_000_000 + y;
    }
  }
};
