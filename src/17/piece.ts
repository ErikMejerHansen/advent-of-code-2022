import { Vector2D } from "../utils";

export class Piece {
  private _shape: Vector2D[];
  private _position: Vector2D;
  private _height: number;

  constructor(shape: Vector2D[], height: number) {
    this._shape = shape;
    this._height = height;
    this._position = [2, 0];
  }

  public get position() {
    return this._position;
  }

  public get shape() {
    return this._shape;
  }

  public get height() {
    return this._height;
  }

  public static get Cube() {
    return new Piece(cube, 2);
  }

  public static get Plus() {
    return new Piece(plus, 3);
  }

  public static get L() {
    return new Piece(l, 3);
  }

  public static get I() {
    return new Piece(i, 4);
  }

  public static get Line() {
    return new Piece(line, 1);
  }
}

const line: Vector2D[] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
];

const cube: Vector2D[] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const plus: Vector2D[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [1, 2],
];

const l: Vector2D[] = [
  [2, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
];

const i: Vector2D[] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];
