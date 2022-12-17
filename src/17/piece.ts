import { Vector2D } from "../utils";

const cube: Vector2D[] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const plus: Vector2D[] = [
  [0, 1],
  [0, 1],
  [1, 1],
  [2, 1],
  [1, 2],
];

const l: Vector2D[] = [
  [2, 0],
  [2, 1],
  [0, 3],
  [1, 3],
  [2, 3],
];

const i: Vector2D[] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

export class Piece {
  private _shape: Vector2D[];
  constructor(shape: Vector2D[]) {
    this._shape = shape;
  }

  public get shape() {
    return this._shape;
  }

  public static get Cube() {
    return new Piece(cube);
  }

  public static get Plus() {
    return new Piece(plus);
  }

  public static get L() {
    return new Piece(l);
  }

  public static get I() {
    return new Piece(i);
  }
}
