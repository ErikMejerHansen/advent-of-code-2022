import { Level } from "./level";
import { Piece } from "./piece";
import { Jet } from "./17";

describe("Level", () => {
  test("you can add a line piece to a level", () => {
    const level = new Level([]);
    level.add(Piece.Line);

    const levelPrint = level.print();

    expect(levelPrint).toEqual("..@@@@.\n" + "@@@@@@@");
  });

  test("you can add a plus piece to a level", () => {
    const level = new Level([]);
    level.add(Piece.Plus);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "...@...\n" + "..@@@..\n" + "...@...\n" + "@@@@@@@"
    );
  });

  test("you can add a cube piece to a level", () => {
    const level = new Level([]);
    level.add(Piece.Cube);

    const levelPrint = level.print();

    expect(levelPrint).toEqual("..@@...\n" + "..@@...\n" + "@@@@@@@");
  });

  test("you can add a L piece to a level", () => {
    const level = new Level([]);
    level.add(Piece.L);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "....@..\n" + "....@..\n" + "..@@@..\n" + "@@@@@@@"
    );
  });

  test("you can add a I piece to a level", () => {
    const level = new Level([]);
    level.add(Piece.I);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "..@....\n" + "..@....\n" + "..@....\n" + "..@....\n" + "@@@@@@@"
    );
  });

  it("a piece will fall all the way to the floor when added", () => {
    const level = new Level([]);
    level.add(Piece.L);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "....@..\n" + "....@..\n" + "..@@@..\n" + "@@@@@@@"
    );
  });

  it("a piece will end up to the left if the jet is blowing left", () => {
    const jets = [Jet.Left];
    const level = new Level(jets);
    level.add(Piece.L);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "..@....\n" + "..@....\n" + "@@@....\n" + "@@@@@@@"
    );
  });

  it("a piece will end up to the right if the jet is blowing right", () => {
    const jets = [Jet.Right];
    const level = new Level(jets);
    level.add(Piece.Plus);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      ".....@.\n" + "....@@@\n" + ".....@.\n" + "@@@@@@@"
    );
  });

  it("a piece will end up in the middle if the jet is alternates direction", () => {
    const jets = [Jet.Right, Jet.Left];
    const level = new Level(jets);
    level.add(Piece.I);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "..@....\n" + "..@....\n" + "..@....\n" + "..@....\n" + "@@@@@@@"
    );
  });

  it("will only move a piece if there are no obstacles", () => {
    const level = new Level([]);
    level.add(Piece.Plus);
    level.add(Piece.I);

    const levelPrint = level.print();

    expect(levelPrint).toEqual(
      "..@....\n" +
        "..@....\n" +
        "..@....\n" +
        "..@@...\n" +
        "..@@@..\n" +
        "...@...\n" +
        "@@@@@@@"
    );
  });

  it("knows the height of the highest piece", () => {
    const level = new Level([]);
    level.add(Piece.Plus);
    level.add(Piece.I);

    expect(level.height).toEqual(6);
  });
});
