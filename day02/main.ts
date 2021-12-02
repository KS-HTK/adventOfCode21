import * as fs from 'fs';

//AdventOfCode Day 2
//main
function main() {
    let lines: Array<Array<string>> = readFile('day02/input').split('\n').map(s => s.split(' '));
    console.log("Part 1: " + part1(lines));
    console.log("Part 2: " + part2(lines));
}

//read file
function readFile(path: string): string {
    return fs.readFileSync(path, 'utf8');
}

//part 1 functions return the number of times the number appears in the array
function part1(lines: Array<Array<string>>): number {
    let p_vert: number = 0;
    let p_hor: number = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0].trim() === '') continue;
        let line: Array<string> = lines[i];
        let n: number = parseInt(line[1]);
        switch (line[0].trim()) {
            case 'up':
                p_vert -= n;
                break;
            case 'down':
                p_vert += n;
                break;
            case 'forward':
                p_hor += n;
                break;
            default:
                console.log("Error: " + line);
        }
    }
    return p_hor*p_vert;
}

//part 2 count lines in array
function part2(lines: Array<Array<string>>): number {
    let p_vert: number = 0;
    let p_hor: number = 0;
    let aim: number = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0].trim() === '') continue;
        let line: Array<string> = lines[i];
        let n: number = parseInt(line[1]);
        switch (line[0].trim()) {
            case 'up':
                aim -= n;
                break;
            case 'down':
                aim += n;
                break;
            case 'forward':
                p_hor += n;
                p_vert += n*aim;
                break;
            default:
                console.log("Error: " + line);
        }
    }
    return p_hor*p_vert;
}

main();