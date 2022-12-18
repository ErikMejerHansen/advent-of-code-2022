import { Level } from "./level";
import { Piece } from "./piece";

export class Game {
  private _turn = 0;
  private _level: Level;
  private _pieces = [Piece.Line, Piece.Plus, Piece.L, Piece.I, Piece.Cube];

  constructor() {
    this._level = new Level([]);
  }

  public run(numberOfTurns: number) {
    for (let i = 0; i < numberOfTurns; i++) {
      this.runTurn();
    }
  }

  private runTurn() {
    this.level.add(this._pieces[0]);
    this.cyclePieces();
    this._turn++;
  }

  private cyclePieces() {
    const [head, ...tail] = this._pieces;

    this._pieces = [...tail, head];
  }

  public get turn() {
    return this._turn;
  }

  public get level() {
    return this._level;
  }
}
