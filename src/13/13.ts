const scalarCompare = (left: number, right: number) => left < right;

export const compare = (left: any, right: any) => {
  if (typeof left === "number" && typeof right === "number") {
    return scalarCompare(left, right);
  }

  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return true;
  }

  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length > 0
  ) {
    return true;
  }

  if (
    Array.isArray(left) &&
    left.length > 0 &&
    Array.isArray(right) &&
    right.length === 0
  ) {
    return true;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const [leftHead, ...leftTail] = left;
    const [rightHead, ...rightTail] = right;
    return compare(leftHead, rightHead) && compare(leftTail, rightTail);
  }

  if (typeof left === "number" && Array.isArray(right)) {
    return compare([left], right);
  }

  if (Array.isArray(left) && typeof right === "number") {
    return compare(left, [right]);
  }
};
