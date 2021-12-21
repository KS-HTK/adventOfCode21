import * as fs from "fs";
import { Map } from "immutable";

//AdventOfCode Day 21

interface Player {
  pos: number;
  score: number;
}
let p1: Player, p2: Player;
let rollCount: number = 0;
//main
function main() {
  let input: Array<string> = fs
    .readFileSync("day21/input", "utf8")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let p1pos: number = parseInt(input[0].split(": ")[1].trim());
  let p2pos: number = parseInt(input[1].split(": ")[1].trim());
  p1 = {
    pos: p1pos,
    score: 0,
  };
  p2 = {
    pos: p2pos,
    score: 0,
  };

  console.log("Part 1: " + part1());
  console.log("Part 2: " + part2(p1pos, p2pos));
}

//do move
function doMove(pos: number, score: number, steps: number): [number, number] {
  pos = ((pos + steps - 1) % 10) + 1;
  score = score + pos;
  return [pos, score];
}

//part 1
function part1(): number {
  let d100 = 1;
  let p = p2;
  do {
    //console.log(p1, p2, d100);
    p = p == p1 ? p2 : p1;
    let roll = d100 * 3 + 3;
    d100 = d100 + 3;
    d100 = d100 > 100 ? d100 - 100 : d100;
    rollCount++;
    let [pos, score] = doMove(p.pos, p.score, roll);
    p.pos = pos;
    p.score = score;
  } while (p.score < 1000);

  p = p == p1 ? p2 : p1;
  return p.score * (rollCount * 3);
}

const combinations: Array<[number, number, number]> = [
  [1, 1, 1],
  [1, 1, 2],
  [1, 1, 3],
  [1, 2, 1],
  [1, 2, 2],
  [1, 2, 3],
  [1, 3, 1],
  [1, 3, 2],
  [1, 3, 3],
  [2, 1, 1],
  [2, 1, 2],
  [2, 1, 3],
  [2, 2, 1],
  [2, 2, 2],
  [2, 2, 3],
  [2, 3, 1],
  [2, 3, 2],
  [2, 3, 3],
  [3, 1, 1],
  [3, 1, 2],
  [3, 1, 3],
  [3, 2, 1],
  [3, 2, 2],
  [3, 2, 3],
  [3, 3, 1],
  [3, 3, 2],
  [3, 3, 3],
];
let wins: Map<string, [number, number]> = Map();

function getWins(p1: Player, p2: Player): [number, number] {
  if (p2.score >= 21) return [0, 1];

  const key: string = [p1.pos, p1.score, p2.pos, p2.score].join(",");
  if (wins.has(key)) return wins.get(key);

  let res: [number, number] = [0, 0];
  for (const comb of combinations) {
    let [pos, score]: [number, number] = doMove(
      p1.pos,
      p1.score,
      comb[0] + comb[1] + comb[2]
    );
    let win: [number, number] = getWins(
      { pos: p2.pos, score: p2.score },
      { pos, score }
    );
    res[0] += win[1];
    res[1] += win[0];
  }
  wins = wins.set(key, res);
  return res;
}

//part 2
function part2(p1: number, p2: number): number {
  const res: [number, number] = getWins(
    { pos: p1, score: 0 },
    { pos: p2, score: 0 }
  );
  return Math.max(...res);
}

main();
