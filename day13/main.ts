import * as fs from "fs";

//AdventOfCode Day 13

//main
function main() {
  let [dotsStr, foldsStr]: Array<string> =
    readFile("day13/input").split("\n\n");
  let dots: Array<[number, number]> = dotsStr
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => {
      let [x, y] = s.split(",");
      return [parseInt(x), parseInt(y)];
    });
  let folds: Array<[string, number]> = foldsStr
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => {
      let arr = s.split("=");
      return [arr[0].slice(-1), parseInt(arr[1])];
    });
  console.log("Part 1: " + part1(dots, folds[0]));
  console.log("Part 2:");
  part2(dots, folds);
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(dots: Array<[number, number]>, fold: [string, number]): number {
  let field = new Array(2000);
  for (let i = 0; i < field.length; i++) {
    field[i] = new Array(2000).fill(false);
  }
  dots.forEach(([x, y]) => {
    field[y][x] = true;
  });
  foldField(field, fold);
  let count = 0;
  field.forEach((row) => {
    row.forEach((cell) => {
      if (cell) count++;
    });
  });
  return count;
}

function foldField(field: Array<Array<boolean>>, fold: [string, number]): void {
  let [dir, pos] = fold;
  if (dir === "y") {
    //fold vertical
    let part = field.splice(pos+1, field.length - pos);
    field.splice(pos, 1);
    part.forEach((row, i) => {
      let vPos = field.length-1-i;
      if (vPos < 0) return;
      field[vPos] = field[vPos].map((v, j) => v || row[j]);
    });
  }
  if (dir === "x") {
    //fold horizontal
    field.map((row) => {
      let part = row.splice(pos+1, row.length - pos);
      row.splice(pos, 1);
      part.forEach((v, i) => {
        let hPos = row.length - 1 - i;
        if (hPos < 0) return;
        row[hPos] = v || row[hPos];
      });
    });
  }
}

//print field
function printField(field: Array<Array<boolean>>): void {
  field.forEach((row) => {
    let s = row.map((v) => (v ? "#" : " ")).join("");
    console.log(s);
  });
  console.log("");
}

//part 2
function part2(dots: Array<[number, number]>, folds: Array<[string, number]>): number {
  let field = new Array(2000);
  for (let i = 0; i < field.length; i++) {
    field[i] = new Array(2000).fill(false);
  }
  dots.forEach(([x, y]) => {
    field[y][x] = true;
  });
  folds.forEach((fold) => foldField(field, fold));
  let count = 0;
  field.forEach((row) => {
    row.forEach((cell) => {
      if (cell) count++;
    });
  });
  printField(field);
  return -1;
}

main();
