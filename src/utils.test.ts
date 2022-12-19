import {
  add,
  addVector3D,
  findMaximum,
  manhattanDistance,
  Matrix,
  numericalSort,
  parseDataToNumberArray,
  parseStringArrayToNumberArray,
  SortDirection,
  subtract,
  toSet,
  transpose,
  upsert,
} from "./utils";

describe("parseDataToNumberArray", () => {
  it("parses a file with numbers on each line as an array of numbers", () => {
    const numbers = parseDataToNumberArray(
      "src/__fixtures__/lines-with-numbers.txt"
    );

    expect(numbers).toHaveLength(6);
    expect(numbers[0]).toBe(23);
    expect(numbers[1]).toBe(-23);
    expect(numbers[4]).toBe(3.14);
  });
});

describe("parseStringArrayToNumberArray", () => {
  it("parses a list of string into numbers", () => {
    const stringNumbers = ["233", "233"];
    expect(parseStringArrayToNumberArray(stringNumbers)).toEqual([233, 233]);
  });
});

describe("findMaximum", () => {
  it("can find the maximum number in an array", () => {
    expect(findMaximum([1, 2, 3, 4])).toBe(4);
    expect(findMaximum([-1, -2, -3, -4])).toBe(-1);
  });
});

describe("upsert", () => {
  it("can add a value to a key not already in the map", () => {
    const map = new Map<string, number>();
    const updater = (_key: string, _previous: number) => 1;

    upsert<string, number>(map, "MyNewKey", updater);

    expect(map.get("MyNewKey")).toBe(1);
  });

  it("can update an existing value", () => {
    const map = new Map<string, number>();
    map.set("MyNewKey", 1);
    const updater = (_key: string, previous: number) => previous + 1;

    upsert<string, number>(map, "MyNewKey", updater);

    expect(map.get("MyNewKey")).toBe(2);
  });

  it("uses the updater function to update values", () => {
    const map = new Map<string, number>();
    map.set("MyNewKey", 1);
    const updater = jest.fn();

    upsert<string, number>(map, "MyNewKey", updater);

    expect(updater).toHaveBeenCalledTimes(1);
  });
});

describe("numericalSort", () => {
  it("acts as the identity function for empty arrays", () => {
    expect(numericalSort([])).toEqual([]);
  });

  it("defaults to doing a ascending sort", () => {
    expect(numericalSort([-2, -10, 56])).toEqual([-10, -2, 56]);
  });

  it("can do a descending sort", () => {
    expect(numericalSort([-2, -10, 56], SortDirection.Descending)).toEqual([
      56, -2, -10,
    ]);
  });
});

describe("transpose", () => {
  it("switched rows and columns", () => {
    const matrix: Matrix<number> = [
      [1, 2],
      [3, 4],
    ];

    const transposedMatrix: Matrix<number> = [
      [1, 3],
      [2, 4],
    ];

    expect(transpose(matrix)).toEqual(transposedMatrix);
  });
});

describe("toSet", () => {
  it("can turn a string into a list of chars", () => {
    expect(toSet("abCDE")).toEqual(new Set(["a", "b", "C", "D", "E"]));
  });
});

describe("vectors", () => {
  describe("Vector2D", () => {
    it("can subtract vectors", () => {
      expect(subtract([0, 0], [0, 0])).toEqual([0, 0]);
      expect(subtract([1, 0], [0, 0])).toEqual([-1, 0]);
      expect(subtract([0, 1], [0, 0])).toEqual([0, -1]);
      expect(subtract([1, 1], [0, 0])).toEqual([-1, -1]);
    });

    it("can add vectors", () => {
      expect(add([0, 0], [0, 0])).toEqual([0, 0]);
      expect(add([1, 0], [0, 0])).toEqual([1, 0]);
      expect(add([0, 1], [0, 0])).toEqual([0, 1]);
      expect(add([1, 1], [0, 0])).toEqual([1, 1]);
    });
  });

  describe("Vector3D", () => {
    it("can add vectors", () => {
      expect(addVector3D([0, 0, 0], [0, 0, 0])).toEqual([0, 0, 0]);

      expect(addVector3D([1, 0, 0], [0, 0, 0])).toEqual([1, 0, 0]);
      expect(addVector3D([0, 1, 0], [0, 0, 0])).toEqual([0, 1, 0]);
      expect(addVector3D([0, 0, 1], [0, 0, 0])).toEqual([0, 0, 1]);

      expect(addVector3D([1, 1, 1], [0, 0, 0])).toEqual([1, 1, 1]);
    });
  });
});

describe("distance measures", () => {
  it("can calculate the manhattan distance between two points on a plane", () => {
    expect(manhattanDistance([0, 0], [0, 0])).toEqual(0);

    expect(manhattanDistance([1, 0], [0, 0])).toEqual(1);
    expect(manhattanDistance([0, 0], [1, 0])).toEqual(1);

    expect(manhattanDistance([0, 1], [0, 0])).toEqual(1);
    expect(manhattanDistance([0, 0], [0, 1])).toEqual(1);

    expect(manhattanDistance([10, 10], [-3, 4])).toEqual(19);
    expect(manhattanDistance([-3, 4], [10, 10])).toEqual(19);
  });
});
