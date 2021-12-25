import * as fs from "fs";

//AdventOfCode Day 24
//solved on paper code written to emulate solution

//main
function main() {
  let input: Array<[string, string] | [string, string, string]> = fs
    .readFileSync("day24/input", "utf8")
    .trim()
    .split("\n")
    .filter((s) => s)
    .map((s) => s.split(" ") as [string, string] | [string, string, string]);
  let tmp: Array<[number, number]> = [];
  let final: Array<[number, number]> = new Array(14);
  for (let i = 0; i < 14; i++) {
    let chk: number = parseInt(input[i * 18 + 5][2]);
    let offset: number = parseInt(input[i * 18 + 15][2]);
    if (chk >= 0) tmp.push([i, offset]);
    else {
      //chk is negative
      let [ind, offset] = tmp.pop();
      let off = offset + chk;
      if (off > 0) {
        final[ind] = [9 - off, 1];
        final[i] = [9, 1 + off];
      } else {
        final[ind] = [9, 1 - off];
        final[i] = [9 + off, 1];
      }
    }
  }
  let max: string = "";
  let min: string = "";
  final.forEach((v) => {
    max = max.concat(v[0].toString());
    min = min.concat(v[1].toString());
  });

  console.log("Part 1: " + max);
  console.log("Part 2: " + min);
}

main();
