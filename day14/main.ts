import { Map } from "immutable";
import * as fs from "fs";

//AdventOfCode Day 14

//main
function main() {
  let [startStr, rulesStr]: Array<string> =
    readFile("day14/input").split("\n\n");
  let rules = Map<string, string>();
  rulesStr
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => {
      let [key, val] = s.split(" -> ");
      rules = rules.set(key, val);
    });
  console.log("Part 1: " + exec(startStr, rules, 10));
  console.log("Part 2: " + exec(startStr, rules, 40));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//step
function step(
  pattern: Map<string, number>,
  rules: Map<string, string>
): Map<string, number> {
  let newPattern = Map<string, number>();
  pattern.forEach((val, key) => {
    let resKey: string = rules.get(key)!;
    newPattern = newPattern.update(key[0] + resKey, 0, (v) => v + val);
    newPattern = newPattern.update(resKey + key[1], 0, (v) => v + val);
  });
  return newPattern;
}

//exec
function exec(poly: string, rules: Map<string, string>, steps: number): number {
  let reg: RegExp = /[A-Z](?=([A-Z]))/g;
  let polyPairs = Map<string, number>();
  let pair: RegExpExecArray;
  while ((pair = reg.exec(poly)) !== null) {
    polyPairs = polyPairs.update(pair[0] + pair[1], 0, (v) => v + 1);
  }
  for (let i = 0; i < steps; i++) {
    polyPairs = step(polyPairs, rules);
  }

  let amounts = Map<string, number>();
  amounts = amounts.update(poly[0], 0, (v) => v + 1);
  amounts = amounts.update(poly[poly.length - 1], 0, (v) => v + 1);

  polyPairs.forEach((val, key) => {
    amounts = amounts.update(key[0], 0, (v) => v + val);
    amounts = amounts.update(key[1], 0, (v) => v + val);
  });

  let min: number = amounts.minBy((v) => v);
  let max: number = amounts.maxBy((v) => v);

  return (max - min) / 2;
}

main();
