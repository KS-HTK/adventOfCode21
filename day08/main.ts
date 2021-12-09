import * as fs from "fs";

//AdventOfCode Day 8
//main
function main() {
  let lines: Array<string> = readFile("day08/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let digits: Array<Array<Array<string>>> = lines.map((l) =>
    l.split(" | ").map((n) => n.split(" "))
  );
  console.log("Part 1: " + part1(digits));
  console.log("Part 2: " + part2(digits));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(digits: Array<Array<Array<string>>>): number {
  let count: number = 0;
  digits.forEach((d) => {
    d[1].forEach((digit4) => {
      if (
        digit4.length === 2 ||
        digit4.length === 4 ||
        digit4.length === 3 ||
        digit4.length === 7
      ) {
        count++;
      }
    });
  });
  return count;
}

//part 2
function part2(digits: Array<Array<Array<string>>>): number {
  let permutations: Array<string> = getPermutations("abcdefg");
  let segmentations: Array<Array<string>> = permutations.map((p) =>
    getSegmentations(p)
  );
  let numbers = digits.map((d) => {
    let seg: Array<string> = segmentations.find((s) => checker(s, d[0]));
    if (!seg) {
      console.log(d);
      return -1;
    }
    let num: Array<number> = d[1].map((d) => {
      let perD = getPermutations(d);
      let digi = perD.find((p) => seg.includes(p));
      return seg.indexOf(digi);
    });
    return Number(num.join(""));
  });
  return numbers.reduce((acc, n) => acc + n, 0);
}

function checker(arr: Array<string>, target: Array<string>): boolean {
  return target.every((v) => getPermutations(v).some((w) => arr.includes(w)));
}

function getSegmentations(str: string): Array<string> {
  return [
    str[0] + str[1] + str[2] + str[4] + str[5] + str[6], //0
    str[2] + str[5], //1
    str[0] + str[2] + str[3] + str[4] + str[6], //2
    str[0] + str[2] + str[3] + str[5] + str[6], //3
    str[1] + str[2] + str[3] + str[5], //4
    str[0] + str[1] + str[3] + str[5] + str[6], //5
    str[0] + str[1] + str[3] + str[4] + str[5] + str[6], //6
    str[0] + str[2] + str[5], //7
    str, //8
    str[0] + str[1] + str[2] + str[3] + str[5] + str[6], //9
  ];
}

function getPermutations(str): Array<string> {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          getPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
}

main();
