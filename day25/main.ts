import * as fs from "fs";

//AdventOfCode Day 25

//main
function main() {
  let input: Array<Array<string>> = fs
    .readFileSync("day25/input", "utf8")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => s.split(""));

  console.log("Merry Christmas!\n" + part1(input));
}

//part 1
function part1(board: Array<Array<string>>): number {
  let count: number = 1;
  let hasChanged: boolean = false;
  do {
    hasChanged = false;
    let newBoard: Array<Array<string>> = JSON.parse(JSON.stringify(board));
    board.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val != ">") return;
        if (row[(j + 1) % row.length] === ".") {
          newBoard[i][j] = ".";
          newBoard[i][(j + 1) % row.length] = ">";
          hasChanged = true;
        }
      });
    });
    board = JSON.parse(JSON.stringify(newBoard));
    board.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val != "v") return;
        if (board[(i + 1) % board.length][j] === ".") {
          newBoard[i][j] = ".";
          newBoard[(i + 1) % newBoard.length][j] = "v";
          hasChanged = true;
        }
      });
    });
    if (hasChanged) {
      board = JSON.parse(JSON.stringify(newBoard));
      count++;
    }
  } while (hasChanged);
  return count;
}

main();
