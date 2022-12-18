import { Vector2D } from "../utils";

export class Piece {
  private _shape: Vector2D[];
  private _position: Vector2D;
  private _height: number;
  private _downChecks: Vector2D[];
  private _leftChecks: Vector2D[];
  private _rightChecks: Vector2D[];

  constructor(
    shape: Vector2D[],
    height: number,
    downChecks: Vector2D[],
    leftChecks: Vector2D[],
    rightChecks: Vector2D[]
  ) {
    this._shape = shape;
    this._height = height;
    this._position = [2, 0];
    this._downChecks = downChecks;
    this._leftChecks = leftChecks;
    this._rightChecks = rightChecks;
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

  public get downChecks() {
    return this._downChecks;
  }

  public get leftChecks() {
    return this._leftChecks;
  }

  public get rightChecks() {
    return this._rightChecks;
  }

  public static get Cube() {
    const cube: Vector2D[] = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ];

    const downChecks: Vector2D[] = [
      [0, 2],
      [1, 2],
    ];
    const leftChecks: Vector2D[] = [
      [-1, 0],
      [-1, 1],
    ];
    const rightChecks: Vector2D[] = [
      [2, 0],
      [2, 1],
    ];

    return new Piece(cube, 2, downChecks, leftChecks, rightChecks);
  }

  public static get Plus() {
    const plus: Vector2D[] = [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ];
    const downChecks: Vector2D[] = [
      [0, 2],
      [2, 2],
      [1, 3],
    ];
    const leftChecks: Vector2D[] = [
      [0, 0],
      [-1, 1],
      [0, 2],
    ];

    const rightChecks: Vector2D[] = [
      [2, 0],
      [3, 1],
      [2, 2],
    ];

    return new Piece(plus, 3, downChecks, leftChecks, rightChecks);
  }

  public static get L() {
    const l: Vector2D[] = [
      [2, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ];
    const downChecks: Vector2D[] = [
      [0, 3],
      [1, 3],
      [2, 3],
    ];
    const leftChecks: Vector2D[] = [
      [1, 0],
      [1, 1],
      [-1, 2],
    ];
    const rightChecks: Vector2D[] = [
      [3, 0],
      [3, 1],
      [3, 2],
    ];

    return new Piece(l, 3, downChecks, leftChecks, rightChecks);
  }

  public static get I() {
    const i: Vector2D[] = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    const downChecks: Vector2D[] = [[0, 4]];
    const leftChecks: Vector2D[] = [
      [-1, 0],
      [-1, 1],
      [-1, 2],
      [-1, 3],
    ];
    const rightChecks: Vector2D[] = [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ];

    return new Piece(i, 4, downChecks, leftChecks, rightChecks);
  }

  public static get Line() {
    const line: Vector2D[] = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const downChecks: Vector2D[] = [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ];

    const leftChecks: Vector2D[] = [[-1, 0]];
    const rightChecks: Vector2D[] = [[4, 0]];

    return new Piece(line, 1, downChecks, leftChecks, rightChecks);
  }
}
