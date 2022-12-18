import { Piece } from "./piece";
import * as utils from "../utils";
import { Jet } from "./17";

export class Level {
  private _levels: boolean[][] = [[true, true, true, true, true, true, true]];
  // "Each rock appears so that its left edge is two units away from the left wall
  // and its bottom edge is three units above the highest rock in the room"
  private _offsetLeft: utils.Vector2D = [2, 0];

  constructor(private _jets: Jet[]) {}

  public add(piece: Piece) {
    // "three units above the highest rock in the room"
    this._levels.unshift([false, false, false, false, false, false, false]);
    this._levels.unshift([false, false, false, false, false, false, false]);
    this._levels.unshift([false, false, false, false, false, false, false]);
    for (let y = 0; y < piece.height; y++) {
      this._levels.unshift([false, false, false, false, false, false, false]);
    }

    let pieceEndPosition = this._offsetLeft;

    if (this._jets[0] === Jet.Left) {
      while (this.canMoveLeft(piece.leftChecks, pieceEndPosition)) {
        pieceEndPosition = utils.add(pieceEndPosition, [-1, 0]);
      }
    }

    while (this.canMoveDown(piece.downChecks, pieceEndPosition)) {
      pieceEndPosition = utils.add(pieceEndPosition, [0, 1]);
    }

    for (const part of piece.shape) {
      const [x, y] = utils.add(pieceEndPosition, part);
      this._levels[y][x] = true;
    }

    // Clear out empty rows at the top
    this._levels = this._levels.filter((row) => !row.every((cell) => !cell));
  }

  private canMoveLeft(checks: utils.Vector2D[], position) {
    return checks.every((willOccupy) => {
      const [x, y] = utils.add(position, willOccupy);
      return x > 0 && !this._levels[y][x];
    });
  }

  private canMoveDown(
    checks: utils.Vector2D[],
    position: utils.Vector2D
  ): boolean {
    return checks.every((willOccupy) => {
      const [x, y] = utils.add(position, willOccupy);
      return !this._levels[y][x];
    });
  }

  public print(): string {
    return this._levels
      .map((level) => level.map((occupied) => (occupied ? "@" : ".")).join(""))
      .join("\n");
  }
}
