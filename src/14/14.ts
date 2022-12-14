import { add, numericalSort, readLines, SortDirection } from "../utils";

type Vector = [number, number];

const parseCoordinatePair = (pair: string): Vector =>
  pair.split(",").map((s) => parseInt(s)) as Vector;

const parseVerticalLine = (from: Vector, to: Vector): Vector[] => {
  const [leftX, leftY] = from;
  const [rightX, _rightY] = to;
  const lineCoordinates = new Array<Vector>();

  for (let x = Math.min(leftX, rightX); x <= Math.max(leftX, rightX); x++) {
    lineCoordinates.push([x, leftY]);
  }

  return lineCoordinates;
};

const parseHorizontalLine = (from: Vector, to: Vector): Vector[] => {
  const [leftX, leftY] = from;
  const [_rightX, rightY] = to;
  const lineCoordinates = new Array<Vector>();

  for (let y = Math.min(leftY, rightY); y <= Math.max(leftY, rightY); y++) {
    lineCoordinates.push([leftX, y]);
  }

  return lineCoordinates;
};

export const parseLineSegment = (left: string, right: string): Vector[] => {
  const from = parseCoordinatePair(left);
  const to = parseCoordinatePair(right);

  if (from[0] !== to[0]) {
    return parseVerticalLine(from, to);
  } else {
    return parseHorizontalLine(from, to);
  }
};

export const parseLine = (line: string): Vector[] => {
  const points = line.split(" -> ");

  const lineCoordinates = points.map((fromPoint, index) => {
    if (index === points.length - 1) {
      return [];
    }
    return parseLineSegment(fromPoint, points[index + 1]);
  });

  lineCoordinates.pop(); // remove the empty element created by the conditional above

  return lineCoordinates.flat();
};

type MapMarking = "." | "+" | "#" | "o";
type Map = Array<Array<MapMarking>>;

const buildEmptyMap = (height: number, width: number) => {
  const map: Map = [];
  for (let y = 0; y < height; y++) {
    const row = new Array<MapMarking>();
    map.push(row);
    for (let x = 0; x < width; x++) {
      row.push(".");
    }
  }

  return map;
};

const markRockLocations = (map: Map, rocks: Vector[], xOffset: number) => {
  for (const rock of rocks) {
    const [x, y] = rock;
    const adjustedX = x - xOffset;
    map[y][adjustedX] = "#";
  }
};

const markSandSource = (map: Map, xOffset: number) => {
  const source = 500 - xOffset;
  map[0][source] = "+";

  return source;
};

export const buildMap = (fileName: string): [Map, Vector] => {
  const data = readLines(fileName);
  const rows = data.map(parseLine);
  const points = rows.flat();

  const minX = numericalSort(points.map(([x, _y]) => x))[0];
  const maxX = numericalSort(
    points.map(([x, _y]) => x),
    SortDirection.Descending
  )[0];

  const maxY = numericalSort(
    points.map(([_x, y]) => y),
    SortDirection.Descending
  )[0];

  // Build empty map
  const map = buildEmptyMap(maxY + 1, maxX - minX + 1);
  // Mark sand source
  const sandSourceX = markSandSource(map, minX);
  // Place rocks
  markRockLocations(map, points, minX);

  return [map, [sandSourceX, 0]];
};

export const viewMap = (map: Map): string => {
  return map.map((row) => row.join("")).join("\n");
};

export const simulateSandGrain = (
  at: Vector,
  map: Map
):
  | { result: "At rest"; position: Vector }
  | { result: "escaped"; position: Vector } => {
  const down = add([0, 1], at);
  const downAndLeft = add([-1, 1], at);
  const downAndRight = add([1, 1], at);

  if (down[1] > map.length - 1) {
    return { result: "escaped", position: down };
  }

  if (downAndLeft[1] > map.length - 1) {
    return { result: "escaped", position: downAndLeft };
  }

  if (downAndRight[1] > map.length - 1) {
    return { result: "escaped", position: downAndLeft };
  }

  if (downAndLeft[0] < 0 || downAndLeft[0] > map[0].length - 1) {
    return { result: "escaped", position: downAndLeft };
  }

  if (downAndRight[0] < 0 || downAndRight[0] > map[0].length - 1) {
    return { result: "escaped", position: downAndRight };
  }

  const isDownBlocked = map[down[1]][down[0]] !== ".";
  const isDownAndLeftBlocked = map[downAndLeft[1]][downAndLeft[0]] !== ".";
  const isDownAndRightBlocked = map[downAndRight[1]][downAndRight[0]] !== ".";

  if (!isDownBlocked) {
    return simulateSandGrain(down, map);
  }

  if (!isDownAndLeftBlocked) {
    return simulateSandGrain(downAndLeft, map);
  }

  if (!isDownAndRightBlocked) {
    return simulateSandGrain(downAndRight, map);
  }

  return { result: "At rest", position: at };
};

export const addSand = (map: Map, at: Vector) => {
  const { position, result } = simulateSandGrain(at, map);
  const [dX, dY] = position;

  if (result === "At rest") {
    map[dY][dX] = "o";
  }

  return { position, result };
};

export const part1 = (fileName: string): number => {
  const [map, sandEntryPoint] = buildMap(fileName);

  let couldAddSand = true;
  let amountOfSand = 0;
  while (couldAddSand) {
    const { result, position } = addSand(map, sandEntryPoint);
    if (result === "At rest" && position[0] === 500 && position[1] === 0) {
      couldAddSand = false;
      amountOfSand++;
    } else if (result === "At rest") {
      couldAddSand = true;
      amountOfSand++;
    } else {
      couldAddSand = false;
    }
  }

  return amountOfSand;
};
