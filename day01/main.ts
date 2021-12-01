import * as fs from 'fs';

//AdventOfCode Day 1
//main
function main() {
    let lines: Array<number> = readFile('day01/input').split('\n').map(x => parseInt(x.trim()));
    console.log("Part 1:", part1(lines));
    console.log("Part 2:", part2(lines));
}

function part1(lines: Array<number>): number {
    let count: number = 0;
    for (let i: number = 1; i < lines.length; i++) {
        //if last is smaller than current count increases
        if (lines[i]>lines[i-1]) {
            count+=1;
        }
    }
    return count;
}

function part2(lines: Array<number>): number {
    let count: number = 0;
    let last: number = lines[0]+lines[1]+lines[2];
    for (let i: number = 3; i < lines.length; i++) {
        let current: number = lines[i]+lines[i-1]+lines[i-2];
        //if sum of last 3 numbers is smaller than current count increases
        if (current>last) {
            count+=1;
        }
        last = current;
    }
    return count;
}

//read file
function readFile(fileName: string): string {
    return fs.readFileSync(fileName, 'utf8');
}

main();