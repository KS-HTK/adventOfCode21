import * as fs from "fs";
import { Map } from "immutable";

//AdventOfCode Day 22

const range = (start, end) =>
  Array.from({ length: end - start }, (_, k) => k + start);
//main
function main() {
  let input: Array<string> = fs
    .readFileSync("day22/input", "utf8")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let cubes: Array<[boolean, Array<number>, Array<number>, Array<number>]> = [];
  const numberPattern = /-?\d+/g;
  input.forEach((line) => {
    let state: boolean = line.split(" ")[0] == "on";
    let [xL, xH, yL, yH, zL, zH]: Array<number> = line
      .match(numberPattern)
      .map((s) => parseInt(s));
    cubes.push([
      state,
      range(xL, xH + 1),
      range(yL, yH + 1),
      range(zL, zH + 1),
    ]);
  });

  console.log("Part 1: " + part1(cubes));
  console.log("Part 2: " + part2(cubes));
}

//get subrange
function getSubRange(
  rangeArr: Array<number>,
  low: number,
  high: number
): Array<number> {
  let c0: number = rangeArr[0];
  let c1: number = rangeArr[rangeArr.length - 1];
  if (c1 < low) {
    return [];
  }
  if (c0 > high) {
    return [];
  }
  c0 = Math.max(c0, low);
  c1 = Math.max(c1, low);
  c0 = Math.min(c0, high);
  c1 = Math.min(c1, high);
  return range(c0, c1 + 1);
}

//part 1
function part1(
  cubes: Array<[boolean, Array<number>, Array<number>, Array<number>]>
): number {
  let grid: Map<string, boolean> = Map();
  for (let cube of cubes) {
    for (let x of getSubRange(cube[1], -50, 50)) {
      for (let y of getSubRange(cube[2], -50, 50)) {
        for (let z of getSubRange(cube[3], -50, 50)) {
          grid = grid.set([x, y, z].join(","), cube[0]);
        }
      }
    }
  }
  let count: number = 0;
  grid.forEach((v) => {
    if (v) count++;
  });
  return count;
}

//count uninterrupted
function countUninterrupted(
  [_, xr, yr, zr]: [boolean, Array<number>, Array<number>, Array<number>],
  rest: Array<[boolean, Array<number>, Array<number>, Array<number>]>
) {
  let activeCubeCount: number = xr.length * yr.length * zr.length;

  let collisions: Array<
    [boolean, Array<number>, Array<number>, Array<number>]
  > = [];

  for (let [state, xr2, yr2, zr2] of rest) {
    let cxr = getSubRange(xr2, xr[0], xr[xr.length - 1]);
    let cyr = getSubRange(yr2, yr[0], yr[yr.length - 1]);
    let czr = getSubRange(zr2, zr[0], zr[zr.length - 1]);

    if (cxr.length == 0 || cyr.length == 0 || czr.length == 0) continue;
    collisions.push([state, cxr, cyr, czr]);
  }

  collisions.forEach((val, key) => {
    activeCubeCount -= countUninterrupted(val, collisions.slice(key + 1));
  });

  return activeCubeCount;
}


//part 2
function part2(
  cubes: Array<[boolean, Array<number>, Array<number>, Array<number>]>
): number {
  let res: number = 0;

  cubes.forEach((cube, index) => {
    if (cube[0]) res += countUninterrupted(cube, cubes.slice(index + 1));
  });
  return res;
}

main();
