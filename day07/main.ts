import * as fs from "fs";

//AdventOfCode Day 7
//main
function main() {
  let lines: string = readFile("day07/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)[0];
  let subs: Array<number> = lines.split(",").map((n) => parseInt(n));
  subs.sort((a, b) => a - b);
  console.log("Part 1: " + part1(subs));
  console.log("Part 2: " + part2(subs));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

function fuelCalc(subs: Array<number>, pos: number): number {
  let fuel: number = 0;
  subs.forEach((n) => {
    fuel += Math.abs(n-pos);
  });
  return fuel;
}

//part 1
function part1(subs: Array<number>): number {
  let min: number = Math.min(...subs);
  let max: number = Math.max(...subs);
  let fuelCost: number = fuelCalc(subs, min);
  for (let i: number = min; i < max; i++) {
    let fCost: number = fuelCalc(subs, i);
    if (fCost < fuelCost) {
      fuelCost = fCost;
    }
  }
  return fuelCost;
}

function expFuelCalc(subs: Array<number>, pos: number): number {
  let fuel: number = 0;
  subs.forEach((n) => {
    let step: number = 1; 
    let dist: number = Math.abs(pos-n);
    for (let i: number = dist; i > 0; i--) {
      fuel += step;
      step++;
    }
  });
  return fuel;
}
//part 2
function part2(subs: Array<number>): number {
  let min: number = Math.min(...subs);
  let max: number = Math.max(...subs);
  let fuelCost: number = expFuelCalc(subs, min);
  for (let i: number = min; i < max; i++) {
    let fCost: number = expFuelCalc(subs, i);
    if (fCost < fuelCost) {
      fuelCost = fCost;
    }
  }
  return fuelCost;
}

main();
