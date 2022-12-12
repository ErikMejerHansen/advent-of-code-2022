import { add } from "../utils";

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

const UP: Vector = [-1, 0];
const DOWN: Vector = [1, 0];
const LEFT: Vector = [0, -1];
const RIGHT: Vector = [0, 1];

const isPathAvailable = (
  [x, y]: Vector,
  currentHight: number,
  heightMap: HeightMap,
  tabooList: string[]
) => {
  if (tabooList.includes(`${x}-${y}`)) return false;
  if (x < 0 || y < 0) return false;
  if (y > heightMap.length - 1 || x > heightMap[y].length - 1) return false;

  return heightMap[y][x] < currentHight + 1;
};

const buildSubgraph = (
  heightMap: HeightMap,
  [x, y]: Vector,
  destination: Vector,
  tabooList: string[],
  isStart = false
): Node => {
  const height = heightMap[y][x];
  const edges = new Array<Edge>();
  tabooList.push(`${x}-${y}`);

  if (x === destination[0] && y === destination[1]) {
    return { isDestination: true, edges: [], height: 0, isStart: false };
  }

  // Up
  const upPosition = add([x, y], UP);
  if (isPathAvailable(upPosition, height, heightMap, tabooList)) {
    const node = buildSubgraph(heightMap, upPosition, destination, [
      ...tabooList,
    ]);
    const edge: Edge = { to: node };
    edges.push(edge);
  }

  // Down
  const downPosition = add([x, y], DOWN);
  if (isPathAvailable(downPosition, height, heightMap, tabooList)) {
    const node = buildSubgraph(heightMap, downPosition, destination, [
      ...tabooList,
    ]);
    const edge: Edge = { to: node };
    edges.push(edge);
  }

  // Left
  const leftPosition = add([x, y], LEFT);
  if (isPathAvailable(leftPosition, height, heightMap, tabooList)) {
    const node = buildSubgraph(heightMap, leftPosition, destination, [
      ...tabooList,
    ]);
    const edge: Edge = { to: node };
    edges.push(edge);
  }

  // right
  const rightPosition = add([x, y], RIGHT);
  if (isPathAvailable(rightPosition, height, heightMap, tabooList)) {
    const node = buildSubgraph(
      heightMap,
      rightPosition,
      destination,
      tabooList
    );
    const edge: Edge = { to: node };
    edges.push(edge);
  }

  return { edges, height, isDestination: false, isStart: isStart };
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
