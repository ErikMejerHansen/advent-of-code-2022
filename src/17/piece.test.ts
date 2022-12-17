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

  it("has a factory function for each shape", () => {
    const cube: Vector2D[] = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const cubePiece = Piece.Cube;

    expect(cubePiece.shape).toEqual(cube);
    expect(Piece.I).not.toBeUndefined();
    expect(Piece.L).not.toBeUndefined();
    expect(Piece.Plus).not.toBeUndefined();
  });

  it.todo("knows if it can move left");
  it.todo("knows if it can move right");
});
