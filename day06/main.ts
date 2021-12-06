import * as fs from "fs";

//AdventOfCode Day 6
//main
function main() {
  let lines: string = readFile("day06/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)[0];
  let fish: Array<number> = lines.split(",").map((n) => parseInt(n));
  fish.sort((a, b) => a - b);
  console.log("Part 1: " + part1(fish));
  console.log("Part 2: " + part2(fish));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(fish: Array<number>): number {
  let newFish: Array<number> = new Array<number>(9).fill(0);
  fish.map((n) => newFish[n]++);
  //loop 80 times
  for (let i = 0; i < 80; i++) {
    newFish = spawn(newFish);
  }
  return newFish.reduce((a, b) => a + b, 0);
}

//part 2
function part2(fish: Array<number>): number {
  let newFish: Array<number> = new Array<number>(9).fill(0);
  fish.map((n) => newFish[n]++);
  //loop 256 times
  for (let i = 0; i < 256; i++) {
    newFish = spawn(newFish);
  }
  return newFish.reduce((a, b) => a + b, 0);
}

function spawn(arr: Array<number>): Array<number> {
  let spawnCount: number = arr[0];
  arr.forEach((n, i) => {
    if (i === 0) return;
    arr[i-1] = n;
  });
  arr[6] = arr[6] + spawnCount;
  arr[8] = spawnCount;
  return arr;
}

main();
