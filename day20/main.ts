import * as fs from "fs";

//AdventOfCode Day 19

let algo: string;
let img: Array<string>;
let boundry: string = ".";
//main
function main() {
  let input: Array<string> = fs
    .readFileSync("day20/input", "utf8")
    .split("\n\n")
    .map((s) => s.trim())
    .filter((s) => s);
  algo = input[0];
  img = input[1].split("\n").filter((s) => s);
  applyAlgo(2);
  console.log("Part 1: " + countLit());
  applyAlgo(48);
  console.log("Part 2: " + countLit());
}

//use Algo
function useAlgo(): void {
  //resizeing image to acompany blank space
  let pre: string = new Array(3).fill(boundry).join("");
  let im: Array<string> = JSON.parse(JSON.stringify(img));
  im.forEach((v, i) => {
    im[i] = pre.concat(v, pre);
  });
  let width: number = im[0].length;
  let emptyStr: string = new Array(width).fill(boundry).join("");
  im.push(emptyStr.slice());
  im.push(emptyStr.slice());
  im.push(emptyStr.slice());
  im.unshift(emptyStr.slice());
  im.unshift(emptyStr.slice());
  im.unshift(emptyStr.slice());

  //run for each pixel:
  let out: Array<string> = [];
  for (let i = 0; i < im.length - 2; i++) {
    let line: string = "";
    for (let j = 0; j < im[i].length - 2; j++) {
      let numStr: string =
        im[i].substr(j, 3) + im[i + 1].substr(j, 3) + im[i + 2].substr(j, 3);
      numStr = numStr.replace(/\./g, "0").replace(/#/g, "1");
      line = line.concat(algo[parseInt(numStr, 2)]);
    }
    out.push(line);
  }
  img = out;
  boundry = out[0][0];
}

//part 1
function countLit(): number {
  let count = 0;
  img.forEach((v) => {
    for (const c of v) {
      count += c == "." ? 0 : 1;
    }
  });
  return count;
}

//part 2
function applyAlgo(count: number): void {
  useAlgo();
  if (count > 1) applyAlgo(count - 1);
}

main();
