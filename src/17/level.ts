import { Piece } from "./piece";
import * as utils from "../utils";

export class Level {
  private _levels: boolean[][] = [[true, true, true, true, true, true, true]];
  // Each rock appears so that its left edge is two units away from the left wall
  // and its bottom edge is three units above the highest rock in the room
  private _offsetLeft: utils.Vector2D = [2, 0];

  public add(piece: Piece) {
    this._levels.unshift([false, false, false, false, false, false, false]);
    this._levels.unshift([false, false, false, false, false, false, false]);
    this._levels.unshift([false, false, false, false, false, false, false]);

    for (let y = 0; y < piece.height; y++) {
      this._levels.unshift([false, false, false, false, false, false, false]);
    }

    for (const part of piece.shape) {
      const [x, y] = utils.add(this._offsetLeft, part);
      this._levels[y][x] = true;
    }
  }

  public print(): string {
    return this._levels
      .map((level) => level.map((occupied) => (occupied ? "@" : ".")).join(""))
      .join("\n");
  }
}
