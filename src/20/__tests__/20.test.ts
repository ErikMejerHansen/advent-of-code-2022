import { mixList } from "./20";

describe("part 1", () => {
  it("can move a number forwards in the list", () => {
    const list = [1, 0, 0];

    expect(mixList(list)).toEqual([0, 1, 0]);
  });

  it.skip("can get the example into the correct order", () => {
    const list = [1, 2, -3, 3, -2, 0, 4];

    expect(mixList(list)).toEqual([1, 2, -3, 4, 0, 3, -2]);
  });
});
