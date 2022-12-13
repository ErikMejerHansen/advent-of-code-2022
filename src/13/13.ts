export const compare = (left: number | number[], right: number | number[]) => {
  if (typeof left === "number" && typeof right === "number") {
    return left < right;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return left.every((value, index) => compare(value, right[index]));
  }
};
