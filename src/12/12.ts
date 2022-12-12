import * as fs from "fs";
import { add, numericalSort } from "../utils";

interface Edge {
  to: Node;
}

interface Node {
  isStart: boolean;
  isDestination: boolean;
  height: number;
  edges: Edge[];
}

interface DirectedAcyclicGraph {
  start: Node;
}

type HeightMap = number[][];
type Vector = [number, number];

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
      if (columns[x] === "E" || columns[x] === "S") {
        heightMapColumns.push(0);
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

const UP: Vector = [0, -1];
const DOWN: Vector = [0, 1];
const LEFT: Vector = [-1, 0];
const RIGHT: Vector = [1, 0];

const isPathAvailable = (
  [x, y]: Vector,
  heightMap: HeightMap,
  tabooList: string[],
  currentHeight: number
) => {
  if (tabooList.includes(`${x}-${y}`)) return false;
  if (x < 0 || y < 0) return false;
  if (y > heightMap.length - 1 || x > heightMap[y].length - 1) return false;

  return heightMap[y][x] <= currentHeight + 1;
};

const traverseDirection = (
  [x, y]: Vector,
  direction: Vector,
  map: HeightMap,
  tabooList: string[],
  destination: Vector
): Edge | undefined => {
  const targetPosition = add([x, y], direction);

  const height = map[y][x];

  if (isPathAvailable(targetPosition, map, tabooList, height)) {
    const node = buildSubgraph(map, targetPosition, destination, [
      ...tabooList,
    ]);
    const edge = { to: node };
    return edge;
  }
};

const buildSubgraph = (
  heightMap: HeightMap,
  [x, y]: Vector,
  destination: Vector,
  tabooList: string[],
  isStart = false
): Node => {
  const height = heightMap[y][x];
  tabooList.push(`${x}-${y}`);

  if (x === destination[0] && y === destination[1]) {
    return { isDestination: true, edges: [], height: 0, isStart: false };
  }

  // Up
  const upEdge = traverseDirection(
    [x, y],
    UP,
    heightMap,
    tabooList,
    destination
  );

  // Down
  const downEdge = traverseDirection(
    [x, y],
    DOWN,
    heightMap,
    tabooList,
    destination
  );

  // Left

  const leftEdge = traverseDirection(
    [x, y],
    LEFT,
    heightMap,
    tabooList,
    destination
  );
  // right
  const rightEdge = traverseDirection(
    [x, y],
    RIGHT,
    heightMap,
    tabooList,
    destination
  );

  return {
    edges: [upEdge, downEdge, leftEdge, rightEdge].filter(
      (edge) => edge !== undefined
    ),
    height,
    isDestination: false,
    isStart: isStart,
  };
};

export const buildDAG = (
  inputMap: string,
  startingPosition: Vector
): DirectedAcyclicGraph => {
  const { destination, heightMap } = parseHeightMap(inputMap);

  const tabooList = new Array<string>();
  const start = buildSubgraph(
    heightMap,
    startingPosition,
    destination,
    tabooList,
    true
  );

  return {
    start,
  };
};

const breadthFirst = (node: Node, depth = 0) => {
  const queue = new Array<Node>(...node.edges.map((edge) => edge.to));

  if (node.isDestination) {
    console.log("Found destination:", depth);
    return depth;
  }

  queue.forEach((node) => {
    return breadthFirst(node, depth + 1);
  });
};

const findShortestPath = (dag: DirectedAcyclicGraph): number => {
  const shortestPath = breadthFirst(dag.start);

  return shortestPath;
};

export const part1 = (fileName: string): number => {
  const data = fs.readFileSync(fileName).toString();
  const dag = buildDAG(data, [0, 0]);

  const shortestPath = findShortestPath(dag);

  return shortestPath;
};
