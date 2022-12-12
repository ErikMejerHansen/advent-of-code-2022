import { part1 } from "../12";

describe("Dec 12", () => {
  //   describe("parses the hight-map as a directed graph of legal moves", () => {
  //     it("can handle simple 2x2 flat map", () => {
  //       const map = "Sa\n" + "aE";
  //       const dag = buildDAG(map, [0, 0]);
  //       expect(dag.start.edges).toHaveLength(2);

  //       // Verify heights and edges form start
  //       expect(dag.start.edges[0].to.height).toEqual(0);
  //       expect(dag.start.edges[1].to.height).toEqual(0);

  //       // Verify existence of paths from start to end
  //       expect(dag.start.isStart).toBe(true);
  //       expect(dag.start.edges[0].to.edges[0].to.isDestination).toBe(true);
  //     });

  //     it("wont allow you to climb more than one step", () => {
  //       const map = "Sc\n" + "aE";
  //       const dag = buildDAG(map, [0, 0]);
  //       expect(dag.start.edges).toHaveLength(1);
  //     });
  //   });
  describe("Part 1", () => {
    it("finds the shortest path trough the sample data", () => {
      expect(part1("src/12/__tests__/test-data.txt")).toEqual(31);
    });

    // it.only("finds the shortest path trough the data", () => {
    //   expect(part1("src/12/data/data.txt")).toEqual(31);
    // });
  });

  describe("Part 2", () => {
    //
  });
});
