import * as fs from "fs";

var count: number;
var gamma: Array<number>;
//AdventOfCode Day 2
//main
function main() {
  let lines: Array<string> = readFile("day03/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let lineArray: Array<Array<number>> = lines.map((line) =>
    line.split("").map((c) => parseInt(c))
  );
  globalThis.count = lines.length;
  console.log("Part 1: " + part1(lineArray));
  console.log("Part 2: " + part2(lineArray));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(lines: Array<Array<number>>): number {
  globalThis.gamma = getGamma(transpose(lines));
  let epsilon: Array<number> = globalThis.gamma.map((val) => Math.abs(val - 1));

  return binArrToInt(globalThis.gamma) * binArrToInt(epsilon);
}

function transpose<Type>(m: Array<Array<Type>>): Array<Array<Type>> {
  return m[0].map((_, i) => m.map((row) => row[i]));
}

function binArrToInt(arr: Array<number>): number {
  return arr.reduce((acc, val) => (acc << 1) | val, 0);
}

function sumArray(arr: Array<Array<number>>): Array<number> {
  return arr.map((line) => line.reduce((a, b) => a + b, 0));
}

function getGamma(input: Array<Array<number>>): Array<number> {
  let numbers: Array<number> = sumArray(input);
  let gamma: Array<number> = new Array();
  //for each number in solArray if linearray.length/2-number > 0 return 1 else 0
  let half = globalThis.count / 2;
  for (let i = 0; i < numbers.length; i++) {
    if (half - numbers[i] > 0) {
      gamma.push(0);
    } else {
      gamma.push(1);
    }
  }
  return gamma;
}

//part 2
function part2(lines: Array<Array<number>>): number {
  let lines2: Array<Array<number>> = JSON.parse(JSON.stringify(lines)); //Dirty Hack for deep copy
  let okygen_rating = binArrToInt(rating(lines));
  let co2_rating = binArrToInt(
    rating(
      lines2,
      false
    )
  );
  return okygen_rating * co2_rating;
}

//get okygen rating
//if supplied with epsilon instead of gamma returns co2 rating
function rating(
  lines: Array<Array<number>>,
  oxygen: boolean = true,
  bit: number = 0
): Array<number> {
  let counts: Array<number> = sumArray(transpose(lines));
  let radix: number = counts[bit] * 2 >= lines.length ? 1 : 0;
  if (!oxygen) radix = Math.abs(radix - 1);
  let newLines: Array<Array<number>> = new Array();
  for (let j = 0; j < lines.length; j++) {
    if (lines[j][bit] == radix) {
      newLines.push(lines[j]);
    }
  }
  if (newLines.length == 1) {
    return newLines[0];
  }
  return rating(
    newLines,
    oxygen,
    bit + 1
  );
}

main();

//This one took me way to long.
//I misunderstood part 2 not getting that the count had to be done for the remaining lines,
// but useing the count of the original lines.