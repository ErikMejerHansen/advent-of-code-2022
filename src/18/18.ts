import { addVector3D, findMaximum, readLines, Vector3D } from "../utils";

export const parseLine = (line: string): [number, number, number] =>
  line.split(",").map((coordinate) => parseInt(coordinate)) as [
    number,
    number,
    number
  ];

const buildShape = (elements: Vector3D[]): boolean[][][] => {
  const maxX = findMaximum(elements.map(([x, _y, _z]) => x));
  const maxY = findMaximum(elements.map(([_x, y, _z]) => y));
  const maxZ = findMaximum(elements.map(([_x, _y, z]) => z));

  const emptyXAxis = new Array(maxX + 1);
  emptyXAxis.fill(false);

  const emptyXYPlane = new Array(maxY + 1);
  for (let y = 0; y <= maxY; y++) {
    emptyXYPlane[y] = JSON.parse(JSON.stringify(emptyXAxis)); // Hacky way of doing a deep copy
  }

  const emptyXYZCube = new Array(maxZ + 1);
  for (let z = 0; z <= maxZ; z++) {
    emptyXYZCube[z] = JSON.parse(JSON.stringify(emptyXYPlane)); // Hacky way of doing a deep copy
  }

  for (const [x, y, z] of elements) {
    emptyXYZCube[z][y][x] = true;
  }

  return emptyXYZCube;
};

const sidesFree = (position: Vector3D, shape: boolean[][][]): number => {
  const directions = [
    addVector3D(position, [1, 0, 0]),
    addVector3D(position, [-1, 0, 0]),
    addVector3D(position, [0, 1, 0]),
    addVector3D(position, [0, -1, 0]),
    addVector3D(position, [0, 0, 1]),
    addVector3D(position, [0, 0, -1]),
  ];

  return directions.filter(([x, y, z]) => {
    if (x < 0 || x > shape[0][0].length - 1) return true;
    if (y < 0 || y > shape[0].length - 1) return true;
    if (z < 0 || z > shape.length - 1) return true;

    return !shape[z][y][x];
  }).length;
};

export const countSides = (shape: Vector3D[]): number => {
  const droplet = buildShape(shape);
  return shape.reduce(
    (countOfFreeSides, position) =>
      countOfFreeSides + sidesFree(position, droplet),
    0
  );
};

export const part1 = (fileName: string): number => {
  const lines = readLines(fileName);
  const points = lines.map(parseLine);

  return countSides(points);
};
