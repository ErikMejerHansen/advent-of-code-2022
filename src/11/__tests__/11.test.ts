import { numericalSort, SortDirection } from "../../utils";
import { Monkey } from "../monkey";

describe("Dec 11", () => {
  const identityFunction = (i: number) => i;
  const alwaysFalse = (_i: number) => false;
  const alwaysTrue = (_i: number) => true;
  const emptyMonkey = new Monkey([], null, null, null, null);

  describe("parsing", () => {
    test("monkeys have an inventory", () => {
      const monkey = new Monkey([79, 98], identityFunction, null, null, null);
      expect(monkey.inventory).toEqual([79, 98]);
    });

    test("monkeys have an transform function", () => {
      const worryLevelTransform = (worryLevel) => worryLevel * 5;
      const monkey = new Monkey(
        [79, 98],
        worryLevelTransform,
        null,
        null,
        null
      );
      expect(monkey.transform).toBe(worryLevelTransform);
    });

    test("monkeys have a function to check if it should throw an item", () => {
      const worryLevelTest = (worryLevel) => worryLevel % 17 === 0;
      const monkey = new Monkey([79, 98], null, worryLevelTest, null, null);
      expect(monkey.test).toBe(worryLevelTest);
    });

    test("monkeys catch items", () => {
      const monkey = new Monkey([79, 98], identityFunction, null, null, null);
      monkey.catch(81);
      expect(monkey.inventory).toEqual([79, 98, 81]);
    });

    test("monkeys have a target to throw to when test is false", () => {
      const monkeyFalse = new Monkey(
        [79, 98],
        identityFunction,
        alwaysFalse,
        null,
        null
      );

      const monkey = new Monkey(
        [79, 98],
        identityFunction,
        alwaysTrue,
        (_x) => 3,
        monkeyFalse,
        null
      );

      expect(monkey.recipientWhenTestIsFalse).toEqual(monkeyFalse);
    });

    test("monkeys have a target to throw to when test is true", () => {
      const monkeyTrue = new Monkey(
        [79, 98],
        null,
        null,
        (_x) => 3,
        null,
        null
      );
      const monkey = new Monkey(
        [79, 98],
        null,
        null,
        (_x) => 3,
        null,
        monkeyTrue
      );

      expect(monkey.recipientWhenTestIsTrue).toEqual(monkeyTrue);
    });
  });

  describe("Part 1", () => {
    test("monkey will trow to expected monkey when test is true", () => {
      const recipientWhenTrue = new Monkey([], null, null, null, null);

      const testFunction = jest.fn();
      testFunction.mockReturnValue(true);

      const monkey = new Monkey(
        [10],
        identityFunction,
        testFunction,
        (_x) => 3,
        null,
        recipientWhenTrue
      );

      monkey.takeTurn();
      expect(recipientWhenTrue.inventory).toEqual([3]);
    });

    test("monkey will trow to expected monkey when test is false", () => {
      const recipientWhenFalse = new Monkey([], null, null, null, null);

      const testFunction = jest.fn();
      testFunction.mockReturnValue(false);

      const monkey = new Monkey(
        [10],
        identityFunction,
        testFunction,
        (_x) => 3,
        recipientWhenFalse,
        null
      );

      monkey.takeTurn();
      expect(recipientWhenFalse.inventory).toEqual([3]);
    });

    test("there are 4 monkeys in the test data", () => {
      expect(Monkey.buildTestDataMonkeys()).toHaveLength(4);
    });

    test("a monkey knows how many items it's inspected", () => {
      const monkey = new Monkey(
        [10],
        identityFunction,
        (_w) => true,
        (_x) => 3,
        emptyMonkey,
        emptyMonkey
      );

      monkey.takeTurn();
      expect(monkey.numberOfItemsInspected).toEqual(1);

      monkey.catch(10);
      monkey.catch(10);
      monkey.catch(10);
      monkey.catch(10);

      monkey.takeTurn();
      expect(monkey.numberOfItemsInspected).toEqual(5);
    });

    test("each monkey get to take a turn each round", () => {
      const monkeys = Monkey.buildTestDataMonkeys();

      Monkey.business(monkeys, 1);

      monkeys.forEach((monkey) => {
        expect(monkey.numberOfItemsInspected).toBeGreaterThan(0);
      });
    });

    test("that the monkey business level for the sample data is 10605", () => {
      const monkeys = Monkey.buildTestDataMonkeys();
      Monkey.business(monkeys, 20);

      const itemsInspected = monkeys.map(
        (monkey) => monkey.numberOfItemsInspected
      );
      const [mostInspected, secondMostInspected, _rest] = numericalSort(
        itemsInspected,
        SortDirection.Descending
      );

      expect(mostInspected * secondMostInspected).toEqual(10605);
    });

    test("there are 8 monkeys in the test data", () => {
      expect(Monkey.buildMonkeys()).toHaveLength(8);
    });

    test("that the monkey business level is 51075", () => {
      const monkeys = Monkey.buildMonkeys();
      Monkey.business(monkeys, 20);

      const itemsInspected = monkeys.map(
        (monkey) => monkey.numberOfItemsInspected
      );
      const [mostInspected, secondMostInspected, _rest] = numericalSort(
        itemsInspected,
        SortDirection.Descending
      );

      expect(mostInspected * secondMostInspected).toEqual(51075);
    });
  });

  describe("Part 2", () => {
    test("that the monkey business level is 11741456163", () => {
      const monkeys = Monkey.buildMonkeys((worry) => worry % 9_699_690);
      Monkey.business(monkeys, 10000);

      const itemsInspected = monkeys.map(
        (monkey) => monkey.numberOfItemsInspected
      );

      const [mostInspected, secondMostInspected, _rest] = numericalSort(
        itemsInspected,
        SortDirection.Descending
      );

      expect(mostInspected * secondMostInspected).toEqual(11741456163);
    });
  });
});
