import { numericalSort, readLines, SortDirection } from "../utils";

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

const buildEmptyMap = (width: number, height: number) => {
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
    map[y][x - xOffset] = "#";
  }
};

const markSandSource = (map: Map, xOffset: number) => {
  // Set source of sand
  map[0][500 - xOffset] = "+";
};

export const buildMap = (fileName: string) => {
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
  // Place rocks
  markRockLocations(map, points, minX);
  // Marks sand source
  markSandSource(map, minX);

  return map;
};

export const viewMap = (map): string => {
  return map.map((row) => row.join("")).join("\n");
};
