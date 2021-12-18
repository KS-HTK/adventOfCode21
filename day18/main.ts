import * as fs from "fs";

//AdventOfCode Day 18

interface Tree {
  type: string;
  value: number | undefined;
  parent: Tree | undefined;
  left: Tree | undefined;
  right: Tree | undefined;
}

function makeTree(
  value: Tree | number | [number, number],
  parent: Tree = undefined
): Tree {
  if (typeof value === "number") {
    return {
      type: "leaf",
      value: value,
      parent: parent,
      left: undefined,
      right: undefined,
    };
  }

  let self = {
    type: "node",
    value: undefined,
    parent: parent,
    left: undefined,
    right: undefined,
  };
  self["left"] = makeTree(value[0], self);
  self["right"] = makeTree(value[1], self);
  return self;
}

function magnitude(v: Tree): number {
  if (v.type === "leaf") {
    return v.value;
  }
  return 3 * magnitude(v.left) + 2 * magnitude(v.right);
}

function add(a: Tree, b: Tree): Tree {
  let self: Tree = {
    type: "node",
    value: undefined,
    parent: undefined,
    left: a,
    right: b,
  };
  a.parent = self;
  b.parent = self;
  return self;
}

function inOrder(value: Tree): Array<Tree> {
  if (value.type === "leaf") {
    return [value];
  } else {
    return inOrder(value.left).concat(inOrder(value.right));
  }
}

function explode(v: Tree, level: number = 0): [Tree, number, number] | null {
  if (
    v.type === "node" &&
    v.left.type == "leaf" &&
    v.right.type == "leaf" &&
    level >= 4
  ) {
    let baseTree: Tree = makeTree(0, v.parent);

    if (v.parent.left == v) {
      v.parent.left = baseTree;
    } else if (v.parent.right == v) {
      v.parent.right = baseTree;
    }

    return [baseTree, v.left.value, v.right.value];
  } else if (v.type === "node") {
    let left = explode(v.left, level + 1);
    if (left != null) return left;

    let right = explode(v.right, level + 1);
    if (right != null) return right;
  }

  return null;
}

function split(v: Tree): boolean {
  if (v.type === "leaf" && v.value >= 10) {
    let baseTree: Tree = makeTree(
      [Math.floor(v.value / 2), Math.ceil(v.value / 2)],
      v.parent
    );
    if (v.parent.left == v) {
      v.parent.left = baseTree;
    } else if (v.parent.right == v) {
      v.parent.right = baseTree;
    } else {
      throw new Error("split error");
    }
    return true;
  } else if (v.type === "node") {
    if (split(v.left)) return true;
    if (split(v.right)) return true;
  }
  return false;
}

function reduce(tree: Tree): Tree {
  let changed: boolean;
  do {
    changed = false;
    let res: [Tree, number, number] = explode(tree);
    if (res != null) {
      let [baseTree, left, right] = res;
      let part: Array<Tree> = inOrder(tree);
      let i = part.indexOf(baseTree);
      if (i < 0) throw new Error("base tree not found");
      if (i > 0) {
        part[i - 1].value += left;
      }
      if (i < part.length - 1) {
        part[i + 1].value += right;
      }
      changed = true;
    } else {
      changed = split(tree);
    }
  } while (changed);
  return tree;
}

//main
function main() {
  let numbers: Array<string> = fs
    .readFileSync("day18/input", "utf8")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let nums: Array<Object> = numbers.map((s) => JSON.parse(s));

  console.log("Part 1: " + part1(nums));
  console.log("Part 2: " + part2(nums));
}

//part 1
function part1(input): number {
  let tree = makeTree(input[0]);
  for (let i = 1; i < input.length; i++) {
    tree = reduce(add(tree, makeTree(input[i])));
  }
  return magnitude(tree);
}

//part 2
function part2(input): number {
  let maxMag: number = Number.MIN_VALUE;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i == j) continue;
      let mag = magnitude(reduce(add(makeTree(input[i]), makeTree(input[j]))));
      if (mag > maxMag) maxMag = mag;
    }
  }
  return maxMag;
}

main();
