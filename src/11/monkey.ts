export class Monkey {
  private _inventory: number[];
  private _transform: (number) => number;
  private _test: (number) => boolean;
  private _recipientWhenTestIsFalse: Monkey;
  private _recipientWhenTestIsTrue: Monkey;
  private _numberOfItemsInspected = 0;
  private _worryRelaxer: (number) => number;

  public constructor(
    inventory: number[],
    transform: (number) => number,
    test: (number) => boolean,
    worryRelaxer: (number) => number,
    monkeyFalse?: Monkey,
    monkeyTrue?: Monkey
  ) {
    this._inventory = inventory;
    this._transform = transform;
    this._test = test;
    this._recipientWhenTestIsFalse = monkeyFalse;
    this._recipientWhenTestIsTrue = monkeyTrue;
    this._worryRelaxer = worryRelaxer;
  }

  public get inventory() {
    return this._inventory;
  }

  public get transform() {
    return this._transform;
  }

  public get test() {
    return this._test;
  }

  public catch(item: number) {
    this.inventory.push(item);
  }

  public get recipientWhenTestIsFalse() {
    return this._recipientWhenTestIsFalse;
  }

  public set recipientWhenTestIsFalse(monkey) {
    this._recipientWhenTestIsFalse = monkey;
  }

  public get recipientWhenTestIsTrue() {
    return this._recipientWhenTestIsTrue;
  }

  public set recipientWhenTestIsTrue(monkey) {
    this._recipientWhenTestIsTrue = monkey;
  }

  public get numberOfItemsInspected() {
    return this._numberOfItemsInspected;
  }

  public takeTurn() {
    for (let i = 0; i < this.inventory.length; i++) {
      const item = this.inventory[i];
      const newWorry = this.transform(item);
      const relaxedWorry = this._worryRelaxer(newWorry);

      if (this.test(relaxedWorry)) {
        this._recipientWhenTestIsTrue.catch(relaxedWorry);
      } else {
        this._recipientWhenTestIsFalse.catch(relaxedWorry);
      }
    }
    this._numberOfItemsInspected += this.inventory.length;
    this._inventory = [];
  }

  public static business(monkeys: Monkey[], rounds: number) {
    for (let i = 0; i < rounds; i++) {
      monkeys.forEach((monkey) => {
        monkey.takeTurn();
      });
    }
  }

  public static buildMonkeys(
    worryLevelRelaxer = (worry) => Math.floor(worry / 3)
  ): Monkey[] {
    const monkey0 = new Monkey(
      [66, 79],
      (old) => old * 11,
      (old) => old % 7 === 0,
      worryLevelRelaxer
    );

    const monkey1 = new Monkey(
      [84, 94, 94, 81, 98, 75],
      (old) => old * 17,
      (old) => old % 13 === 0,
      worryLevelRelaxer
    );

    const monkey2 = new Monkey(
      [85, 79, 59, 64, 79, 95, 67],
      (old) => old + 8,
      (old) => old % 5 === 0,
      worryLevelRelaxer
    );

    const monkey3 = new Monkey(
      [70],
      (old) => old + 3,
      (old) => old % 19 === 0,
      worryLevelRelaxer
    );

    const monkey4 = new Monkey(
      [57, 69, 78, 78],
      (old) => old + 4,
      (old) => old % 2 === 0,
      worryLevelRelaxer
    );

    const monkey5 = new Monkey(
      [65, 92, 60, 74, 72],
      (old) => old + 7,
      (old) => old % 11 === 0,
      worryLevelRelaxer
    );

    const monkey6 = new Monkey(
      [77, 91, 91],
      (old) => old * old,
      (old) => old % 17 === 0,
      worryLevelRelaxer
    );

    const monkey7 = new Monkey(
      [76, 58, 57, 55, 67, 77, 54, 99],
      (old) => old + 6,
      (old) => old % 3 === 0,
      worryLevelRelaxer
    );

    monkey0.recipientWhenTestIsTrue = monkey6;
    monkey0.recipientWhenTestIsFalse = monkey7;

    monkey1.recipientWhenTestIsTrue = monkey5;
    monkey1.recipientWhenTestIsFalse = monkey2;

    monkey2.recipientWhenTestIsTrue = monkey4;
    monkey2.recipientWhenTestIsFalse = monkey5;

    monkey3.recipientWhenTestIsTrue = monkey6;
    monkey3.recipientWhenTestIsFalse = monkey0;

    monkey4.recipientWhenTestIsTrue = monkey0;
    monkey4.recipientWhenTestIsFalse = monkey3;

    monkey5.recipientWhenTestIsTrue = monkey3;
    monkey5.recipientWhenTestIsFalse = monkey4;

    monkey6.recipientWhenTestIsTrue = monkey1;
    monkey6.recipientWhenTestIsFalse = monkey7;

    monkey7.recipientWhenTestIsTrue = monkey2;
    monkey7.recipientWhenTestIsFalse = monkey1;

    return [
      monkey0,
      monkey1,
      monkey2,
      monkey3,
      monkey4,
      monkey5,
      monkey6,
      monkey7,
    ];
  }
  public static buildTestDataMonkeys(
    worryLevelRelaxer = (worry) => Math.floor(worry / 3)
  ): Monkey[] {
    const monkey0 = new Monkey(
      [79, 98],
      (w) => w * 19,
      (w) => w % 23 === 0,
      worryLevelRelaxer
    );

    const monkey1 = new Monkey(
      [54, 65, 75, 74],
      (w) => w + 6,
      (w) => w % 19 === 0,
      worryLevelRelaxer
    );

    const monkey2 = new Monkey(
      [79, 60, 97],
      (w) => w * w,
      (w) => w % 13 === 0,
      worryLevelRelaxer
    );

    const monkey3 = new Monkey(
      [74],
      (w) => w + 3,
      (w) => w % 17 === 0,
      worryLevelRelaxer
    );

    monkey0.recipientWhenTestIsTrue = monkey2;
    monkey0.recipientWhenTestIsFalse = monkey3;

    monkey1.recipientWhenTestIsTrue = monkey2;
    monkey1.recipientWhenTestIsFalse = monkey0;

    monkey2.recipientWhenTestIsTrue = monkey1;
    monkey2.recipientWhenTestIsFalse = monkey3;

    monkey3.recipientWhenTestIsTrue = monkey0;
    monkey3.recipientWhenTestIsFalse = monkey1;

    return [monkey0, monkey1, monkey2, monkey3];
  }
}
