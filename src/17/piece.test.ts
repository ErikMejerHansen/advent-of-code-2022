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
    const cubePiece = new Piece(cube, 3, [], []);

    expect(cubePiece.shape).toEqual(cube);
  });

  it("has a factory function for each shape", () => {
    expect(Piece.Cube).not.toBeUndefined();
    expect(Piece.I).not.toBeUndefined();
    expect(Piece.L).not.toBeUndefined();
    expect(Piece.Plus).not.toBeUndefined();
  });

  it("knows its position", () => {
    expect(Piece.L.position).toEqual([2, 0]);
  });

  it.each([
    ["-", 1, Piece.Line],
    ["+", 3, Piece.Plus],
    ["L", 3, Piece.L],
    ["I", 4, Piece.I],
    ["Cube", 2, Piece.Cube],
  ])("knows that a %s shape has a height of %i", (_, height, piece) => {
    expect(piece.height).toEqual(height);
  });

  it("can tell which cells to check before moving down", () => {
    const piece = Piece.Line;

    expect(piece.downChecks).toEqual([
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ]);
  });
  it.todo("can tell which cells to check before moving left");
  it.todo("can tell which cells to check before moving right");
});
