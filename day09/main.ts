import * as fs from "fs";

//AdventOfCode Day 7
//main
function main() {
  let lines: Array<string> = readFile("day09/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let map: Array<Array<number>> = lines.map((l) =>
    l.split("").map((n) => parseInt(n))
  );
  console.log("Part 1: " + part1(map));
  console.log("Part 2: " + part2(map));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(map: Array<Array<number>>): number {
  return getLowPoints(map).reduce((acc, p) => acc + 1 + map[p[0]][p[1]], 0);
}

//get low points
function getLowPoints(map: Array<Array<number>>): Array<[number, number]> {
  let low_points: Array<[number, number]> = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      let neighbors: Array<number> = getNeighbors([x, y], map).map(
        (n) => map[n[0]][n[1]]
      );
      if (isLow(map[x][y], neighbors)) {
        low_points.push([x, y]);
      }
    }
  }
  return low_points;
}

//is low
function isLow(point_value: number, neighbors: Array<number>): boolean {
  return neighbors.every((n) => point_value < n);
}

function getNeighbors(
  point: [number, number],
  map: Array<Array<number>>
): Array<[number, number]> {
  let neighbors: Array<[number, number]> = [];
  let x: number = point[0];
  let y: number = point[1];
  if (x > 0) {
    neighbors.push([x - 1, y]);
  }
  if (x < map.length - 1) {
    neighbors.push([x + 1, y]);
  }
  if (y > 0) {
    neighbors.push([x, y - 1]);
  }
  if (y < map[0].length - 1) {
    neighbors.push([x, y + 1]);
  }
  return neighbors;
}

//part 2
function part2(map: Array<Array<number>>): number {
  let low_points: Array<[number, number]> = getLowPoints(map);
  let basins: Array<number> = low_points.map((p) => getBasinSize(p, map));
  let max_basins: Array<number> = basins.sort((a, b) => b - a).slice(0, 3);
  return max_basins.reduce((acc, b) => acc * b, 1);
}

function getBasinSize(
  point: [number, number],
  map: Array<Array<number>>
): number {
  let checked: Array<[number, number]> = [];
  let queue: Array<[number, number]> = [point];
  while (queue.length > 0) {
    let p: [number, number] = queue.shift();
    if (checked.some((a) => JSON.stringify(a) == JSON.stringify(p)) || map[p[0]][p[1]] === 9) {
      continue;
    }
    checked.push(p);
    let neighbors: Array<[number, number]> = getNeighbors(p, map);
    neighbors.forEach((n) => {
      if (
        !checked.some((a) => JSON.stringify(a) == JSON.stringify(n)) &&
        map[n[0]][n[1]] < 9
      ) {
        queue.push(n);
      }
    });
  }
  return checked.length;
}

main();
