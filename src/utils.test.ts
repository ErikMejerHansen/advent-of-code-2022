import { parseDataToNumberArray } from "./utils";

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
