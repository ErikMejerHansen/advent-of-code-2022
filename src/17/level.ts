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

    // Make room for the new piece
    for (let y = 0; y < piece.height; y++) {
      this._levels.unshift([false, false, false, false, false, false, false]);
    }

    // Find the end position for the new piece
    const pieceEndPosition = this.findPiecePlacement(piece);

    for (const part of piece.shape) {
      const [x, y] = utils.add(pieceEndPosition, part);
      this._levels[y][x] = true;
    }

    // Clear out empty rows at the top
    this._levels = this._levels.filter((row) => !row.every((cell) => !cell));
  }

  public print(): string {
    return this._levels
      .map((level) => level.map((occupied) => (occupied ? "@" : ".")).join(""))
      .join("\n");
  }

  public get height() {
    return this._levels.length - 1;
  }

  private findPiecePlacement(piece: Piece): utils.Vector2D {
    let pieceEndPosition = this._offsetLeft;
    let didMove = false;

    do {
      didMove = false;
      if (
        this._jets[0] === Jet.Right &&
        this.canMoveRight(piece.rightChecks, pieceEndPosition)
      ) {
        pieceEndPosition = utils.add(pieceEndPosition, [1, 0]);
        didMove = true;
      }

      if (
        this._jets[0] === Jet.Left &&
        this.canMoveLeft(piece.leftChecks, pieceEndPosition)
      ) {
        pieceEndPosition = utils.add(pieceEndPosition, [-1, 0]);
        didMove = true;
      }

      if (this.canMoveDown(piece.downChecks, pieceEndPosition)) {
        pieceEndPosition = utils.add(pieceEndPosition, [0, 1]);
        didMove = true;
      } else {
        didMove = false;
      }

      // Move the jet to the next position
      const [currentJet, ...rest] = this._jets;
      this._jets = [...rest, currentJet];
    } while (didMove);

    return pieceEndPosition;
  }

  private canMoveRight(checks: utils.Vector2D[], position) {
    return checks.every((willOccupy) => {
      const [x, y] = utils.add(position, willOccupy);
      return x <= this._levels.length - 1 && !this._levels[y][x];
    });
  }

  private canMoveLeft(checks: utils.Vector2D[], position) {
    return checks.every((willOccupy) => {
      const [x, y] = utils.add(position, willOccupy);
      return x >= 0 && !this._levels[y][x];
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
}
