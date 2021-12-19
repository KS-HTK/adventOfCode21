import * as fs from "fs";
import { List, Set } from "immutable";

//AdventOfCode Day 19

type Scanner = [number, number, number][];
let deltas: [number, number, number][] = [[0, 0, 0]];
let transforms = Set<List<number>>();

//main
function main() {
  let scans: Array<string> = fs
    .readFileSync("day19/input", "utf8")
    .split("\n\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let scanRes: Array<Array<[number, number, number]>> = scans.map((s) =>
    s
      .split("\n")
      .filter((s) => /-?\d*,-?\d*,-?\d*/g.test(s))
      .map(
        (line) =>
          line.split(",").map((n) => parseInt(n)) as [number, number, number]
      )
  );

  const out = mapAll(scanRes);
  console.log("Part 1: " + out.length);
  console.log("Part 2: " + part2(deltas));
}

function mapAll(scanners: Array<Scanner>): Scanner {
  let current: Scanner = scanners.shift()!;
  while (scanners.length > 0) {
    let updated = false;
    for (let scanner of scanners) {
      let match = findMatch(current, scanner);
      if (match !== undefined) {
        current = match;
        scanners = scanners.splice(scanners.indexOf(scanner), 1);
        updated = true;
        break;
      }
    }
    if (!updated) {
      throw new Error("failed");
    }
  }
  return current;
}

function findMatch(a: Scanner, b: Scanner): Scanner | undefined {
  let tf: [number, number, number] = [1, 2, 3];
  let currentB = b;
  for (let xr = 0; xr < 4; xr++) {
    // xy rotation
    currentB = currentB.map((p) => [-p[1], p[0], p[2]]);
    tf = [-tf[1], tf[0], tf[2]];
    for (let yr = 0; yr < 4; yr++) {
      // yz rotation
      currentB = currentB.map((p) => [p[0], -p[2], p[1]]);
      tf = [tf[0], -tf[2], tf[1]];
      for (let zr = 0; zr < 4; zr++) {
        // xz rotation
        currentB = currentB.map((p) => [-p[2], p[1], p[0]]);
        tf = [-tf[2], tf[1], tf[0]];
        transforms = transforms.add(List(tf));
        const delta = findMatchNoRotate(a, currentB);
        if (delta !== undefined) {
          let merged = Set(a.map(List)).union(
            Set(
              currentB
                .map((p) => [p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]])
                .map(List)
            )
          );
          deltas.push(delta);
          return merged
            .toArray()
            .map((p) => p.toArray() as [number, number, number]);
        }
      }
    }
  }
  return undefined;
}

function findMatchNoRotate(
  a: Scanner,
  b: Scanner
): [number, number, number] | undefined {
  let aSet = Set(a.map(List));
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let common = 0;
      let delta = [a[i][0] - b[j][0], a[i][1] - b[j][1], a[i][2] - b[j][2]];
      for (let k = 0; k < b.length; k++) {
        if (aSet.has(List(b[k].map((p, i) => p + delta[i])))) {
          common++;
        }
      }
      if (common >= 12) {
        return delta as [number, number, number];
      }
    }
  }
  return undefined;
}

//part 2
function part2(delta: [number, number, number][]): number {
  let max = 0;
  for (let a of delta) {
    for (let b of delta) {
      max = Math.max(
        max,
        Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
      );
    }
  }
  return max;
}

main();
