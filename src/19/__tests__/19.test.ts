import { BluePrint } from "../Blueprint";
import { Resource, Robot } from "../robot";

describe("Dec 19", () => {
  describe("Robots", () => {
    test("ore robots produces ore", () => {
      const robot = Robot.Ore(1, {
        clay: 0,
      });
      expect(robot.produce()).toEqual({ type: Resource.ore, amount: 1 });
    });

    test("clay robots produce clay", () => {
      const robot = Robot.Clay(1, {});
      expect(robot.produce()).toEqual({
        type: Resource.clay,
        amount: expect.any(Number),
      });
    });

    test("obsidian robots produce clay", () => {
      const robot = Robot.Obsidian(1, {});
      expect(robot.produce()).toEqual({
        type: Resource.obsidian,
        amount: expect.any(Number),
      });
    });

    test("geode robots produce open geodes", () => {
      const robot = Robot.Geode(1, {});
      expect(robot.produce()).toEqual({
        type: Resource.openGeode,
        amount: expect.any(Number),
      });
    });

    test("robots can produce multiple units of a resource per production", () => {
      const robot = Robot.Geode(2, {});
      expect(robot.produce()).toEqual({ type: Resource.openGeode, amount: 2 });
    });

    test("robots can have differing costs", () => {
      const robot = Robot.Geode(2, { ore: 3, clay: 2, obsidian: 1 });
      expect(robot.cost).toEqual({
        ore: 3,
        clay: 2,
        obsidian: 1,
      });
    });
  });

  describe("Part 1", () => {
    test("robots add materials to the stockpile", () => {
      const robots = [Robot.Ore(1, {})];
      const bluePrint = new BluePrint(robots, []);

      bluePrint.run(1);

      expect(bluePrint.stockpile).toEqual({
        ore: 1,
        clay: 0,
        obsidian: 0,
        openGeode: 0,
      });
    });

    describe("Greedy strategy to robot purchases", () => {
      it("will only buy a robot if it can afford it", () => {
        const robots = [Robot.Ore(1, { ore: 1 })];
        const availableRobots = [Robot.Ore(1, { ore: 1_000 })];

        const bluePrint = new BluePrint(robots, availableRobots);

        bluePrint.run(1);

        expect(bluePrint.robots).toHaveLength(1);
      });

      it("will by ore robots when it can", () => {
        const robots = [Robot.Ore(1, { ore: 1 })];
        const bluePrint = new BluePrint(robots, [Robot.Ore(1, { ore: 1 })]);

        bluePrint.run(2);

        expect(bluePrint.robots).toHaveLength(2);
        bluePrint.robots.forEach((robot) => {
          expect(robot.productionType).toEqual(Resource.ore);
        });
      });

      it("will by robots in the prioritized order", () => {
        const startingRobots = [Robot.Ore(1, { ore: 1 })];
        const availableRobots = [
          Robot.Geode(1, { obsidian: 1 }),
          Robot.Obsidian(1, { clay: 1 }),
          Robot.Clay(1, { ore: 2 }),
          Robot.Ore(1, { ore: 1 }),
        ];

        const bluePrint = new BluePrint(startingRobots, availableRobots);

        bluePrint.run(2);
        expect(bluePrint.robots.map((robot) => robot.productionType)).toContain(
          Resource.ore
        );

        bluePrint.run(2);
        expect(bluePrint.robots.map((robot) => robot.productionType)).toContain(
          Resource.clay
        );

        bluePrint.run(2);
        expect(bluePrint.robots.map((robot) => robot.productionType)).toContain(
          Resource.obsidian
        );

        bluePrint.run(2);
        expect(bluePrint.robots.map((robot) => robot.productionType)).toContain(
          Resource.openGeode
        );
      });

      it.skip("can optimize example blueprint to get 9 open geodes", () => {
        const robots = [Robot.Ore(1, { ore: 4 })];
        const availableRobots = [
          Robot.Geode(1, { ore: 3, obsidian: 7 }),
          Robot.Obsidian(1, { ore: 3, clay: 14 }),
          Robot.Clay(1, { ore: 2 }),
          Robot.Ore(1, { ore: 4 }),
        ];

        const bluePrint = new BluePrint(robots, availableRobots);

        bluePrint.run(24);
        console.log(bluePrint.robots.map((robot) => robot.productionType));

        expect(bluePrint.stockpile.openGeode).toEqual(9);
      });
    });
  });

  describe("Part 2", () => {
    //
  });
});
