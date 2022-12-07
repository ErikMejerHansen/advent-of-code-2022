import { Tree } from "./tree";

describe("tree construction", () => {
  it("can construct a tree with root and one leaf", () => {
    const tree = new Tree();
    tree.add(new Tree("foo"));

    expect(tree.children[0].value).toEqual("foo");
  });

  it("can construct a tree with root and one subtree", () => {
    const tree = new Tree();

    const subtree = new Tree();
    const leaf = new Tree("leaf");
    subtree.add(leaf);

    tree.add(subtree);

    expect(tree.children[0].children[0]).toBe(leaf);
  });

  it("can construct a tree with root and multiple subtrees", () => {
    const tree = new Tree();

    const subtree1 = new Tree();
    const leaf1 = new Tree("leaf");
    subtree1.add(leaf1);

    const subtree2 = new Tree();
    const leaf2 = new Tree("leaf");
    subtree1.add(leaf2);

    tree.add(subtree1, subtree2);

    expect(tree.children[0].children[0]).toBe(leaf1);
    expect(tree.children[1].children[0]).toBe(leaf2);
  });
});
