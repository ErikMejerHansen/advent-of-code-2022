export class Tree<V> {
  private _children: Tree<V>[];
  private _value: V;

  constructor(value?: V) {
    this._value = value;
    this._children = [];
  }

  public get children() {
    return this._children;
  }

  public get value() {
    return this._value;
  }

  public add(...children: Tree<V>[]): void {
    this._children.push(...children);
  }

  public traverse(
    callbackfn: (previousValue: V, currentNode: Tree<V>) => V,
    initialValue: V
  ) {
    const value = callbackfn(initialValue, this);
    return this.children.reduce(
      (prev, node) => node.traverse(callbackfn, prev),
      value
    );
  }
}
