import { Resource, Robot } from "./robot";

export class BluePrint {
  private _robots: Robot[];
  private _stockpile: Record<Resource, number>;
  private _productionQueue: Robot[];
  private _availableRobots: Robot[];

  constructor(startingRobots: Robot[], availableRobots: Robot[]) {
    this._robots = startingRobots;
    this._stockpile = { ore: 0, clay: 0, obsidian: 0, openGeode: 0 };
    this._productionQueue = [];
    this._availableRobots = availableRobots;
  }

  public run(numberOfMinutes = 24) {
    for (let minute = 0; minute < numberOfMinutes; minute++) {
      console.log(`== Minute ${minute} ==`);
      this.purchaseRobots();
      this.produceResources();
      this.constructRobots();
    }
  }
  public get stockpile() {
    return this._stockpile;
  }

  public get robots() {
    return this._robots;
  }

  private purchaseRobots() {
    // Pre-condition: the robots are listed in order of priority following a greedy approach
    for (const robot of this._availableRobots) {
      if (this.canAfford(robot)) {
        this.buyRobot(robot);
      }
    }
  }

  private canAfford(robot: Robot): boolean {
    const oreCost = robot.cost.ore ?? 0;
    const clayCost = robot.cost.clay ?? 0;
    const obsidianCost = robot.cost.obsidian ?? 0;

    return (
      this.stockpile.ore >= oreCost &&
      this.stockpile.clay >= clayCost &&
      this.stockpile.obsidian >= obsidianCost
    );
  }

  private buyRobot(robot: Robot) {
    console.log("Bought:", robot.productionType);
    const oreCost = robot.cost.ore ?? 0;
    const clayCost = robot.cost.clay ?? 0;
    const obsidianCost = robot.cost.obsidian ?? 0;

    this.stockpile.ore -= oreCost;
    this.stockpile.clay -= clayCost;
    this.stockpile.obsidian -= obsidianCost;

    this._productionQueue.push(robot);
  }

  private produceResources() {
    const production = this._robots.map((robot) => robot.produce());
    production.forEach(({ type, amount }) => {
      console.log("Produced:", amount, " ", type);
      this._stockpile[type] = this._stockpile[type] + amount;
    });
  }

  private constructRobots() {
    this._robots.push(...this._productionQueue);
    this._productionQueue = [];
  }
}
