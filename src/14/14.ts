import { version } from "prettier";

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

export const parseLineSegment = (line: string): number[][] => {
  const [leftSideOfArrow, rightSideOfArrow] = line.split(" -> ");
  const from = parseCoordinatePair(leftSideOfArrow);
  const to = parseCoordinatePair(rightSideOfArrow);

  if (from[0] !== to[0]) {
    return parseVerticalLine(from, to);
  } else {
    return parseHorizontalLine(from, to);
  }
};
