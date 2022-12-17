import { Vector2D } from "../utils";
import { Piece } from "./piece";

describe("Piece", () => {
  it("has a shape", () => {
    const cube: Vector2D[] = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const cubePiece = new Piece(cube);

    expect(cubePiece.shape).toEqual(cube);
  });
  it.todo("knows if it can move left");
  it.todo("knows if it can move right");
});
