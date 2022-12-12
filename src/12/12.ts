import * as fs from "fs";
import { add } from "../utils";

type HeightMap = number[][];
type Vector = [number, number];

const UP: Vector = [0, -1];
const DOWN: Vector = [0, 1];
const LEFT: Vector = [-1, 0];
const RIGHT: Vector = [1, 0];

const locateDestination = (heightMap: string): Vector => {
  const rows = heightMap.split("\n");
  for (let y = 0; y < rows.length; y++) {
    const columns = rows[y].split("");
    for (let x = 0; x < columns.length; x++) {
      if (columns[x] === "E") {
        return [x, y];
      }
    }
  }
};

const parseHeights = (map: string): HeightMap => {
  const heightMapRow = [];

  const rows = map.split("\n");
  for (let y = 0; y < rows.length; y++) {
    const heightMapColumns = [];
    heightMapRow.push(heightMapColumns);
    const columns = rows[y].split("");
    for (let x = 0; x < columns.length; x++) {
      if (columns[x] === "S") {
        heightMapColumns.push(0);
      } else if (columns[x] === "E") {
        heightMapColumns.push("z".charCodeAt(0) - 97);
      } else {
        heightMapColumns.push(columns[x].charCodeAt(0) - 97);
      }
    }
  }

  return heightMapRow;
};

const parseHeightMap = (
  map: string
): { destination: Vector; heightMap: HeightMap } => {
  const destination = locateDestination(map);
  const heightMap = parseHeights(map);

  return {
    destination,
    heightMap,
  };
};

const isPathAvailable = (
  [x, y]: Vector,
  heightMap: HeightMap,
  currentHeight: number
) => {
  if (x < 0 || y < 0) return false;
  if (y > heightMap.length - 1 || x > heightMap[y].length - 1) return false;

  return heightMap[y][x] <= currentHeight + 1;
};

interface QueueItem {
  point: Vector;
  distance: number;
}
const hasPointBeenVisited = ([x, y], visitedList): boolean => {
  const filtered = visitedList.filter(
    ({ point }) => x === point[0] && y === point[1]
  );

  return filtered.length !== 0;
};

const findShortestPath = (
  start: Vector,
  [endX, endY]: Vector,
  map: HeightMap
) => {
  const queue = new Array<QueueItem>();
  queue.push({ point: start, distance: 0 });

  const visited = new Array<QueueItem>();
  visited.push({ point: start, distance: 0 });

  while (queue.length !== 0) {
    const current = queue.shift();

    const [x, y] = current.point;
    const height = map[y][x];

    if (x === endX && y === endY) {
      return current.distance;
    }

    const candidates = [
      add(current.point, UP),
      add(current.point, DOWN),
      add(current.point, LEFT),
      add(current.point, RIGHT),
    ];

    if (
      isPathAvailable(candidates[0], map, height) &&
      !hasPointBeenVisited(candidates[0], visited)
    ) {
      const item = { point: candidates[0], distance: current.distance + 1 };
      queue.push(item);
      visited.push(item);
    }

    if (
      isPathAvailable(candidates[1], map, height) &&
      !hasPointBeenVisited(candidates[1], visited)
    ) {
      const item = { point: candidates[1], distance: current.distance + 1 };
      queue.push(item);
      visited.push(item);
    }

    if (
      isPathAvailable(candidates[2], map, height) &&
      !hasPointBeenVisited(candidates[2], visited)
    ) {
      const item = { point: candidates[2], distance: current.distance + 1 };
      queue.push(item);
      visited.push(item);
    }

    if (
      isPathAvailable(candidates[3], map, height) &&
      !hasPointBeenVisited(candidates[3], visited)
    ) {
      const item = { point: candidates[3], distance: current.distance + 1 };
      queue.push(item);
      visited.push(item);
    }
  }
};

export const part1 = (fileName: string): number => {
  const data = fs.readFileSync(fileName).toString();
  const { destination, heightMap } = parseHeightMap(data);

  return findShortestPath([0, 0], destination, heightMap);
};
