import * as fs from "fs";

var count: number;
var gamma: Array<number>;
//AdventOfCode Day 4
//main
function main() {
  const numberPattern = /\d+/g;

  let board: Array<string> = readFile("day04/input")
    .split("\n\n")
    .map((s) => s.trim())
    .filter((s) => s);
  let numbers: string = board.splice(0, 1)[0];
  let boards: Array<Array<Array<number>>> = board.map((b) =>
    b.split("\n").map((l) => l.match(numberPattern).map((m) => parseInt(m)))
  );
  console.log(
    "Part 1: " +
      part1(
        boards,
        numbers.split(",").map((n) => parseInt(n))
      )
  );
  console.log(
    "Part 2: " +
      part2(
        boards,
        numbers.split(",").map((n) => parseInt(n))
      )
  );
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(
  boards: Array<Array<Array<number>>>,
  draws: Array<number>
): number {
  let [winner, guessed]: [Array<Array<number>>, Array<number>] = findWinner(
    boards,
    draws
  );
  if (!winner) {
    return -1;
  }
  let unmarked: Array<number> = winner.reduce(
    (acc, row) => acc.concat(row.filter((n) => !guessed.includes(n))),
    []
  );
  let score: number = unmarked.reduce((a, b) => a + b, 0);
  return score * guessed.pop();
}

function findWinner(
  boards: Array<Array<Array<number>>>,
  draws: Array<number>
): [Array<Array<number>>, Array<number>] {
  let guessed: Array<number> = new Array(
    draws[0],
    draws[1],
    draws[2],
    draws[3]
  );
  for (let i = 4; i < draws.length; i++) {
    guessed.push(draws[i]);
    for (let j = 0; j < boards.length; j++) {
      let won: boolean = hasWon(boards[j], guessed);
      if (won) {
        return [boards[j], guessed];
      }
    }
  }
  return [undefined, guessed];
}

let checker = (target: Array<number>, subject: Array<number>) =>
  subject.every((n) => target.includes(n));
function hasWon(board: Array<Array<number>>, guessed: Array<number>): boolean {
  //check rows
  let rowWin: boolean = board.some((row) => checker(guessed, row));
  let cols: Array<Array<number>> = transpose(board);
  let colWin: boolean = cols.some((row) => checker(guessed, row));
  return rowWin || colWin;
}

function transpose<Type>(m: Array<Array<Type>>): Array<Array<Type>> {
  return m[0].map((_, i) => m.map((row) => row[i]));
}

//part 2
function part2(
  boards: Array<Array<Array<number>>>,
  draws: Array<number>
): number {
  let Win: [Array<Array<number>>, Array<number>];
  while (boards.length > 0) {
    Win = findWinner(boards, draws);
    if (!Win[0]) {
      return -1;
    }
    boards.splice(boards.indexOf(Win[0]), 1);
  }
  let unmarked: Array<number> = Win[0].reduce(
    (acc, row) => acc.concat(row.filter((n) => !Win[1].includes(n))),
    []
  );
  let score: number = unmarked.reduce((a, b) => a + b, 0);
  return score * Win[1].pop();
}

main();
