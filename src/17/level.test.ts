import { Level } from "./level";
import { Piece } from "./piece";

describe("Level", () => {
  test("you can add a line piece to a level", () => {
    const level = new Level();
    level.add(Piece.Line);

    const levelPrint = level.print();

    expect(levelPrint).toEqual("..@@@@.\n" + "@@@@@@@");
  });

  test("you can add a plus piece to a level", () => {
    const level = new Level();
    level.add(Piece.Plus);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "...@...\n" + "..@@@..\n" + "...@...\n" + "@@@@@@@"
    );
  });

  test("you can add a cube piece to a level", () => {
    const level = new Level();
    level.add(Piece.Cube);

    const levelPrint = level.print();

    expect(levelPrint).toEqual("..@@...\n" + "..@@...\n" + "@@@@@@@");
  });

  test("you can add a L piece to a level", () => {
    const level = new Level();
    level.add(Piece.L);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "....@..\n" + "....@..\n" + "..@@@..\n" + "@@@@@@@"
    );
  });

  test("you can add a I piece to a level", () => {
    const level = new Level();
    level.add(Piece.I);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "..@....\n" + "..@....\n" + "..@....\n" + "..@....\n" + "@@@@@@@"
    );
  });
  it("a piece will fall all the way to the floor when added", () => {
    const level = new Level();
    level.add(Piece.L);

    const levelPrint = level.print();
    console.log(levelPrint);

    expect(levelPrint).toEqual(
      "....@..\n" + "....@..\n" + "..@@@..\n" + "@@@@@@@"
    );
  });
  it.todo("will move a piece left when when the jet blows to the left");
  it.todo("will move a piece left when when the jet blows to the right");
  it.todo("will only move a piece if there are no obstacles");
  it.todo("knows the height of the highest piece");
});
