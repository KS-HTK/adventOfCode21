//AdventOfCode Day 17

let input = "target area: x=282..314, y=-80..-45";

let [x1, x2] = input.split(" ")[2].split("=")[1].split("..").map(x => parseInt(x));
let [y1, y2] = input.split(" ")[3].split("=")[1].split("..").map(x => parseInt(x));

//fuction step
function step(dx, dy): number|null {
  let [x, y]: [number, number] = [0, 0];
  let maxHeight = -Infinity;
  while (y >= y1) {
    x += dx;
    y += dy;
    maxHeight =  Math.max(y, maxHeight);
    dx -= Math.sign(dx);
    dy--;
    if (x1 <= x && x <= x2 && y1 <= y && y <= y2) return maxHeight;
  }
  return null;
}

//main
function main() {
  let maxHeight = -Infinity;
  let count = 0;
  for (let yVelo = y1; yVelo < -y1; yVelo++) {
    for (let xVelo = x2*5; xVelo >= 0; xVelo--) {
      let height: number = step(xVelo, yVelo);
      if (height != null) {
        maxHeight = Math.max(maxHeight, height);
        count++;
      }
    }
  }
  console.log("Part 1: " + maxHeight);
  console.log("Part 2: " + count);
}

//fuction 

main();
