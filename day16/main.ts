import * as fs from "fs";

//AdventOfCode Day 16

//packet data structure
class Packet {
  sumVersion: number = 0;
  value: number | null = null;
  consumedBits: number = 0;
}

const func: Record<number, Function> = {
  0: (a: number, b: number) => a + b,
  1: (a: number, b: number) => a * b,
  2: (a: number, b: number) => (a < b ? a : b),
  3: (a: number, b: number) => (a > b ? a : b),
  5: (a: number, b: number) => (a > b ? 1 : 0),
  6: (a: number, b: number) => (a < b ? 1 : 0),
  7: (a: number, b: number) => (a === b ? 1 : 0),
};

//main
function main() {
  let msg: string = fs
    .readFileSync("day16/input", "utf8")
    .trim()
    .split("")
    .map((s) => parseInt(s, 16).toString(2).padStart(4, "0"))
    .join("");
  let packet: Packet = parsePackets(msg);
  console.log("Part 1: " + packet.sumVersion);
  console.log("Part 2: " + packet.value);
}

//parse packets
function parsePackets(data: string): Packet {
  let res: Packet = new Packet();
  res.sumVersion = parseInt(data.slice(0, 3), 2);
  let id: number = parseInt(data.slice(3, 6), 2);
  res.consumedBits += 6;
  let msg: string = data.slice(6);
  if (id === 4) {
    let next: string = "";
    let num: string = "";
    let c: number = 0;
    do {
      next = msg.slice(5 * c, 5 * (1 + c++));
      num += next.slice(1);
      res.consumedBits += 5;
    } while (next[0] === "1");
    res.value = parseInt(num, 2);
    return res;
  } else {
    let i: string = msg[0];
    msg = msg.slice(1);
    res.consumedBits += 1;
    let subpacketCount: number = Number.MAX_VALUE;
    if (i === "1") {
      //11 bit Length
      subpacketCount = parseInt(msg.slice(0, 11), 2);
      msg = msg.slice(11);
      res.consumedBits += 11;
    } else {
      //15 bit Length
      let subpacketLen = parseInt(msg.slice(0, 15), 2);
      msg = msg.slice(15);
      res.consumedBits += 15;
      msg = msg.slice(0, subpacketLen);
    }
    for (let i = 0; i < subpacketCount && msg.length > 0; i++) {
      let subpacket: Packet = parsePackets(msg);
      msg = msg.slice(subpacket.consumedBits);
      res.consumedBits += subpacket.consumedBits;
      res.sumVersion += subpacket.sumVersion;
      res.value =
        res.value === null
          ? subpacket.value
          : func[id](res.value, subpacket.value);
    }
  }
  return res;
}

main();
