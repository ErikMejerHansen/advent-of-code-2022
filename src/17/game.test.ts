import { Game } from "./game";

describe("Game", () => {
  it("knows which game turn it is", () => {
    const game = new Game([]);
    expect(game.turn).toEqual(0);
  });

  it("adds a piece to the level each turn", () => {
    const game = new Game([]);
    game.run(1);
    expect(game.level.height).toEqual(1); // First piece is the - piece

    game.run(1);
    expect(game.level.height).toEqual(1 + 3); // Second piece is the + piece

    game.run(1);
    expect(game.level.height).toEqual(1 + 3 + 3); // Third piece is the L piece

    game.run(1);
    expect(game.level.height).toEqual(1 + 3 + 3 + 2); // Fourth piece is the I piece

    game.run(1);
    expect(game.level.height).toEqual(1 + 3 + 3 + 2 + 2); // Fifth piece is the cube piece
  });

  it("can run for a certain amount of turns", () => {
    const game = new Game([]);
    game.run(100);
    expect(game.turn).toEqual(100);
  });
});
