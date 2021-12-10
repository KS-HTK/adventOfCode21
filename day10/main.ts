import * as fs from "fs";

//AdventOfCode Day 10
//main
function main() {
  let lines: Array<string> = readFile("day10/input")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  console.log("Part 1: " + part1(lines));
  console.log("Part 2: " + part2(lines));
}

//read file
function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

//part 1
function part1(lines: Array<string>): number {
  let {syntaxScore} = fix(lines);
  return syntaxScore;
}

interface fixReturn {
  syntaxScore: number;
  fixed: Array<string>;
}
function fix(lines: Array<string>): fixReturn {
  let syntaxScore: number = 0;
  let key: number = lines.length-1;
  let fixed: Array<string> = [];
  while (key >= 0) {
    let line: string = lines[key];  
    let stack: Array<string> = [];
    let chars: Array<string> = line.split("");
    let last: string = "";
    let error: boolean = false;
    for (let c of chars) {
      switch (c) {
        case "<":
        case "(":
        case "[":
        case "{":
          stack.push(c);
          break;
        case ">":
          last = stack.pop();
          if (last !== "<") {
            syntaxScore += 25137;
            error = true;
          }
          break;
        case "}":
          last = stack.pop();
          if (last !== "{") {
            syntaxScore += 1197;
            error = true;
          }
          break;
        case "]":
          last = stack.pop();
          if (last !== "[") {
            syntaxScore += 57;
            error = true;
          }
          break;
        case ")":
          last = stack.pop();
          if (last !== "(") {
            syntaxScore += 3;
            error = true;
          }
          break;
      }
      if (error) {
        lines.splice(key, 1);
        break;
      }
    }
    if (!error) {
      fixed.unshift(buildFix(stack));
    }
    key--;
  }
  return {syntaxScore, fixed};
}

function buildFix(stack: Array<string>): string {
  let res = stack.map((s) => {
    switch (s) {
      case "<": return ">";
      case "{": return "}";
      case "[": return "]";
      case "(": return ")";
    }
  });
  return res.reverse().join("");
}

//part 2
function part2(lines: Array<string>): number {
  let {fixed} = fix(lines);
  let scores: Array<number> = rate(fixed);
  scores.sort((a, b) => b - a);
  return scores[Math.floor(scores.length / 2)];
}

function rate(lines: Array<string>): Array<number> {
  return lines.map((line) => {
    let score: number = 0;
    let chars: Array<string> = line.split("");
    chars.map((c) => {
      score*=5;
      switch (c) {
        case ">":
          score++;
        case "}":
          score++;
        case "]":
          score++;
        case ")":
          score++;
      }
    });
    return score;
  });
}

main();
