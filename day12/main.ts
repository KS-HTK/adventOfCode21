import * as fs from "fs";

//AdventOfCode Day 12

let conn: Array<Array<string>> = [];
let paths: Array<Array<string>> = [];
//main
function main() {
  let lines: Array<string> = readFile("day12/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let connections: Array<Array<string>> = [];
  lines.map((line) => {
    let [key, val] = line.split("-");
    connections[key] = [val].concat(connections[key] || []);
    connections[val] = [key].concat(connections[val] || []);
  });
  conn = connections;
  console.log("Part 1: " + part1());
  console.log("Part 2: " + part2());
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//find paths
function findPaths(twice: boolean = true, path: Array<string> = ["start"]): void {
  let current = path[path.length - 1];
  conn[current].forEach((node) => {
    if (node === "start") return;
    if (node === "end") {
      paths.push([...path].concat(node));
      return;
    }
    if (node === node.toLowerCase() && path.includes(node)) {
      if (!twice) findPaths(true, [...path].concat(node));
      return;
    }
    else findPaths(twice, [...path].concat(node));
  });
}

//part 1
function part1(): number {
  findPaths();
  return paths.length;
}

//part 2
function part2(): number {
  paths = [];
  findPaths(false);
  return paths.length;
}

main();
