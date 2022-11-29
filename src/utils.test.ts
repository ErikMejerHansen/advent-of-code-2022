import { parseDataToNumberArray, upsert } from "./utils";

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

describe("upsert", () => {
  it("can add a value to a key not already in the map", () => {
    const map = new Map<string, number>();
    const updater = (_previous: number) => 1;

    upsert<string, number>(map, "MyNewKey", updater, true);

    expect(map.get("MyNewKey")).toBe(1);
  });

  it("can update an existing value", () => {
    const map = new Map<string, number>();
    map.set("MyNewKey", 1);
    const updater = (previous: number) => previous + 1;

    upsert<string, number>(map, "MyNewKey", updater, true);

    expect(map.get("MyNewKey")).toBe(2);
  });

  it("uses the updater function to update values", () => {
    const map = new Map<string, number>();
    map.set("MyNewKey", 1);
    const updater = jest.fn();

    upsert<string, number>(map, "MyNewKey", updater, true);

    expect(updater).toHaveBeenCalledTimes(1);
  });
});
