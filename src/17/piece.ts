import { Vector2D } from "../utils";

export class Piece {
  private _shape: Vector2D[];
  private _position: Vector2D;
  private _height: number;
  private _downChecks: Vector2D[];
  private _leftChecks: Vector2D[];

  constructor(
    shape: Vector2D[],
    height: number,
    downChecks: Vector2D[],
    leftChecks: Vector2D[]
  ) {
    this._shape = shape;
    this._height = height;
    this._position = [2, 0];
    this._downChecks = downChecks;
    this._leftChecks = leftChecks;
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
    return this._downChecks;
  }

  public static get Cube() {
    const downChecks: Vector2D[] = [
      [0, 2],
      [1, 2],
    ];
    const leftChecks: Vector2D[] = [
      [-1, 0],
      [-1, 1],
    ];

    return new Piece(cube, 2, downChecks, leftChecks);
  }

  public static get Plus() {
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

    return new Piece(plus, 3, downChecks, leftChecks);
  }

  public static get L() {
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

    return new Piece(l, 3, downChecks, leftChecks);
  }

  public static get I() {
    const downChecks: Vector2D[] = [[0, 4]];
    const leftChecks: Vector2D[] = [
      [-1, 0],
      [-1, 1],
      [-1, 2],
      [-1, 3],
    ];

    return new Piece(i, 4, downChecks, leftChecks);
  }

  public static get Line() {
    const downChecks: Vector2D[] = [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ];

    const leftChecks: Vector2D[] = [[-1, 0]];
    return new Piece(line, 1, downChecks, leftChecks);
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
  [1, 0],
  [0, 1],
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
