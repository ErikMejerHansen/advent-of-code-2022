export enum Resource {
  ore = "ore",
  clay = "clay",
  obsidian = "obsidian",
  openGeode = "openGeode",
}

export class Robot {
  private _productionFunction: () => { type: Resource; amount: number };
  private _cost: Partial<Record<Resource, number>>;
  private _productionType: Resource;

  constructor(
    productionFunction: () => { type: Resource; amount: number },
    cost: Pick<Resource, number>,
    productionType: Resource
  ) {
    this._productionFunction = productionFunction;
    this._cost = cost;
    this._productionType = productionType;
  }

  public get cost() {
    return this._cost;
  }

  public get productionType() {
    return this._productionType;
  }

  public produce() {
    return this._productionFunction();
  }

  public static Clay(
    numberProduced = 1,
    cost: Partial<Record<Resource, number>>
  ) {
    const productionFunction = () => ({
      type: Resource.clay,
      amount: numberProduced,
    });
    return new Robot(productionFunction, cost, Resource.clay);
  }

  public static Ore(
    numberProduced = 1,
    cost: Partial<Record<Resource, number>>
  ) {
    const productionFunction = () => ({
      type: Resource.ore,
      amount: numberProduced,
    });
    return new Robot(productionFunction, cost, Resource.ore);
  }

  public static Obsidian(
    numberProduced = 1,
    cost: Partial<Record<Resource, number>>
  ) {
    const productionFunction = () => ({
      type: Resource.obsidian,
      amount: numberProduced,
    });
    return new Robot(productionFunction, cost, Resource.obsidian);
  }

  public static Geode(
    numberProduced = 1,
    cost: Partial<Record<Resource, number>>
  ) {
    const productionFunction = () => ({
      type: Resource.openGeode,
      amount: numberProduced,
    });
    return new Robot(productionFunction, cost, Resource.openGeode);
  }
}
