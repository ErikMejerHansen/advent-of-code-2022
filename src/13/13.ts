const scalarCompare = (left: number, right: number) => left < right;
const scalarListCompare = (left: number[], right: number[]) =>
  left.every((value, index) => compare(value, right[index]));
const scalarLeftListRightCompare = (left: number, right: number[]) =>
  scalarListCompare([left], right);
const listLeftScalarRightCompare = (left: number[], right: number) =>
  scalarListCompare(left, [right]);

export const compare = (left: number | number[], right: number | number[]) => {
  if (typeof left === "number" && typeof right === "number") {
    return scalarCompare(left, right);
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return scalarListCompare(left, right);
  }

  if (typeof left === "number" && Array.isArray(right)) {
    return scalarLeftListRightCompare(left, right);
  }

  if (Array.isArray(left) && typeof right === "number") {
    return listLeftScalarRightCompare(left, right);
  }
};
