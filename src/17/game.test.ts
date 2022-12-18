import { Game } from "./game";

describe("Game", () => {
  it("knows which game turn it is", () => {
    const game = new Game();
    expect(game.turn).toEqual(0);
  });

  it.todo("adds a piece to the level each turn");
  it("can run for a certain amount of turns", () => {
    const game = new Game();
    game.run(100);
    expect(game.turn).toEqual(100);
  });
});
