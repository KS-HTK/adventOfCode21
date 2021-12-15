import * as fs from "fs";

//AdventOfCode Day 15

let board: Array<Array<number>>;
let width: number;
let height: number;
//main
function main() {
  board = readFile("day15/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => s.split("").map((c) => parseInt(c)));
  width = board[0].length;
  height = board.length;
  console.log("Part 1: " + part1());
  /*execution for part2 takes about ages.
  I am not quite sure how to optimize it.*/
  console.log("Part 2: " + part2());
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part1
function part1(): number {
  return run();
}

//part2
function part2(): number {
  let origin: Array<Array<number>> = JSON.parse(JSON.stringify(board));
  for (let x = 1; x < 5; x++) {
    board = board.concat(origin.map((row) => row.map((c) => wrap(c + x))));
  }
  origin = JSON.parse(JSON.stringify(board));
  for (let y = 1; y < 5; y++) {
    board = board.map((row, ind) =>
      row.concat(origin[ind].map((c) => wrap(c + y)))
    );
  }
  width = board[0].length;
  height = board.length;
  return run();
}

function getNeighbors(x: number, y: number): Array<[number, number]> {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
}

function wrap(n: number): number {
  return ((n - 1) % 9) + 1;
}

function run(): number {
  const sort = (
    a: [number, [number, number]],
    b: [number, [number, number]]
  ): number => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    if (a[1][0] !== b[1][0]) {
      return a[1][0] - b[1][0];
    }
    return a[1][1] - b[1][1];
  };
  const toVisit_push = (x: [number, [number, number]]): void => {
    toVisit.push(x);
    toVisit.sort(sort);
  };
  
  let toVisit: Array<[number, [number, number]]> = [];
  let costs: Object = {};
  let visited: Array<string> = [];

  toVisit_push([0, [0, 0]]);
  while (toVisit.length > 0) {
    let [cost, [x, y]] = toVisit.shift();
    if (visited.includes([x, y].toString())) {
      continue;
    }
    visited.push([x, y].toString());
    if (x == width - 1 && y == height - 1) {
      return cost + board[y][x];
    }
    let neighbors: Array<[number, number]> = getNeighbors(x, y);
    let cheapest: number;
    if (x == 0 && y == 0) {
      cheapest = 0;
      costs[[x, y].toString()] = 0;
    } else {
      cheapest = 99999;
      neighbors.forEach((n) => {
        let nStr = n.toString();
        if (costs.hasOwnProperty(nStr) && costs[nStr] < cheapest) {
          cheapest = costs[nStr];
        }
      });
      costs[[x, y].toString()] = cheapest + board[y][x];
    }
    neighbors.forEach(([dx, dy]) => {
      if (0 <= dx && dx < width && 0 <= dy && dy < height) {
        toVisit_push([costs[[x, y].toString()], [dx, dy]]);
      }
    });
  }
}

main();
