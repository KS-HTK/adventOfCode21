import * as fs from "fs";

//AdventOfCode Day 5
//main
function main() {
  let lines: Array<string> = readFile("day05/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let cordSet: Array<Array<Array<number>>> = lines.map((line) =>
    line.split(" -> ").map((cords) => cords.split(",").map((n) => parseInt(n)))
  );
  console.log("Part 1: " + part1(cordSet));
  console.log("Part 2: " + part2(cordSet));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(cords: Array<Array<Array<number>>>): number {
  let field: Array<Array<number>> = new Array(1000);
  for (let i = 0; i < field.length; i++) {
    let neo: Array<number> = new Array(1000).fill(0);
    field[i] = neo;
  }
  cords.forEach(([[x1, y1], [x2, y2]]) => {
    if (x2 < x1) {
      let temp = x1;
      x1 = x2;
      x2 = temp;
    }
    if (y2 < y1) {
      let temp = y1;
      y1 = y2;
      y2 = temp;
    }
    if (x1 == x2 || y1 == y2) {
      for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
          field[y][x] += 1;
        }
      }
    }
  });
  let count: number = 0;
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      if (field[x][y] > 1) count++;
    }
  }
  return count;
}

//part 2
function part2(cords: Array<Array<Array<number>>>): number {
  let field: Array<Array<number>> = new Array(1000);
  for (let i = 0; i < field.length; i++) {
    let neo: Array<number> = new Array(1000).fill(0);
    field[i] = neo;
  }
  cords.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 == x2 || y1 == y2) {
      if (x2 < x1) {
        let temp = x1;
        x1 = x2;
        x2 = temp;
      }
      if (y2 < y1) {
        let temp = y1;
        y1 = y2;
        y2 = temp;
      }
      for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
          field[y][x] += 1;
        }
      }
    } else {
      if (x2 < x1) {
        let tmp = x1;
        let tmp2 = y1;
        x1 = x2;
        y1 = y2;
        x2 = tmp;
        y2 = tmp2;
      }
      let len = x2 - x1;
      for (let i = 0; i <= len; i++) {
        field[(y2 < y1) ? y1 - i : y1 + i][x1 + i] += 1;
      }
    }
  });
  let count: number = 0;
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      if (field[x][y] > 1) count++;
    }
  }
  return count;
}

main();
