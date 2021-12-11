import * as fs from "fs";
import { setPriority } from "os";

//AdventOfCode Day 11
//main
function main() {
  let lines: Array<string> = readFile("day11/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let octo: Array<Array<Octopus>> = lines.map((line) =>
    line.split("").map((s) => new Octopus(parseInt(s)))
  );
  console.log("Part 1: " + part1(octo));
  console.log("Part 2: " + part2(octo));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

class Octopus {
  level: number;
  neighbors: Array<Octopus> = [];

  constructor(lv: number) {
    this.level = lv;
  }

  flash(): Array<Octopus> {
    return this.neighbors
      .map((o) => (o.increase() ? o : undefined))
      .filter((o) => o);
  }

  increase(): boolean {
    this.level++;
    return this.level == 10;
  }

  reset() {
    if (this.level > 9) {
      this.level = 0;
    }
  }

  addNeighbor(o: Octopus) {
    this.neighbors.push(o);
  }
}

//part 1
function part1(octo: Array<Array<Octopus>>): number {
  setNeighbors(octo);
  return countLights(octo);
}

function setNeighbors(octo: Array<Array<Octopus>>) {
  for (let i = 0; i < octo.length; i++) {
    for (let j = 0; j < octo[i].length; j++) {
      let o = octo[i][j];
      if (i > 0) o.addNeighbor(octo[i - 1][j]);
      if (i < octo.length - 1) o.addNeighbor(octo[i + 1][j]);
      if (j > 0) {
        o.addNeighbor(octo[i][j - 1]);
        if (i > 0) o.addNeighbor(octo[i - 1][j - 1]);
        if (i < octo.length - 1) o.addNeighbor(octo[i + 1][j - 1]);
      }
      if (j < octo[i].length - 1) {
        o.addNeighbor(octo[i][j + 1]);
        if (i > 0) o.addNeighbor(octo[i - 1][j + 1]);
        if (i < octo.length - 1) o.addNeighbor(octo[i + 1][j + 1]);
      }
    }
  }
}

//count lights
function countLights(octo: Array<Array<Octopus>>): number {
  let count = 0;
  let steps = 100;

  while (steps-- > 0) {
    let flasher: Array<Octopus> = [];
    for (let i = 0; i < octo.length; i++) {
      for (let j = 0; j < octo[i].length; j++) {
        if (octo[i][j].increase()) {
          flasher.push(octo[i][j]);
        }
      }
    }
    while (flasher.length > 0) {
      let f = flasher.shift();
      flasher.push(...f.flash());
      count++;
    }
    for (let i = 0; i < octo.length; i++) {
      for (let j = 0; j < octo[i].length; j++) {
        octo[i][j].reset();
      }
    }
  }
  return count;
}

//part 2
function part2(octo: Array<Array<Octopus>>): number {
  let step = 0;
  while (true) {
    let flasher: Array<Octopus> = [];
    for (let i = 0; i < octo.length; i++) {
      for (let j = 0; j < octo[i].length; j++) {
        if (octo[i][j].increase()) {
          flasher.push(octo[i][j]);
        }
      }
    }
    while (flasher.length > 0) {
      let f = flasher.shift();
      flasher.push(...f.flash());
    }
    octo.forEach((row) => row.forEach((o) => o.reset()));
    step++;
    if (octo.every((row) => row.every((o) => o.level == 0))) return step+100;
  }
}

main();
