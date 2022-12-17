import { Vector2D } from "../utils";

export class Piece {
  private _shape: Vector2D[];
  constructor(shape: Vector2D[]) {
    this._shape = shape;
  }

  public get shape() {
    return this._shape;
  }
}
