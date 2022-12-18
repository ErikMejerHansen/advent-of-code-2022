export class Game {
  private _turn = 0;

  public run(numberOfTurns: number) {
    for (let i = 0; i < numberOfTurns; i++) {
      this.runTurn();
    }
  }

  private runTurn() {
    this._turn++;
  }

  public get turn() {
    return this._turn;
  }
}
