import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "sixteen";
  await test(day, 1, partOne, 16);
  await solve(day, 1, partOne, 0);
  await test(day, 2, partTwo, 0);
  await solve(day, 2, partTwo, 0);
}

function partOne(input: Array<string>): number {
  // convert all hexa bits into binary bits
  // first 3 - version (number)
  // next 3 - typeID (number)
  // next are chunks of 5
  // const binary = input[0].split('').map(x => parseInt(x, 16).toString(2))
  const hex = input[0].split("").map((x) => parseInt(x, 16));
  console.log("input", input[0]);
  console.log("hex", hex.join(""));
  const binary: Array<string> = hex
    .map((x) => x.toString(2).padStart(4, "0"))
    .join("")
    .split("");
  // console.log(binary)
  console.log("binary", binary.join(""));

  const versions = processPackets(binary);
  console.log("versions", versions);
  return versions.reduce((p,c) => p+c,0)
}

function processPackets(binary: Array<string>): Array<number> {
  const versions: Array<number> = [];
  while (binary.length > 0) { // && binary.reduce((p,c) => parseInt(c, 10)+p,0) > 0) {
    console.log("processing", binary.join(""));
    const version = parseInt(binary.splice(0, 3).join(""), 2);
    const typeId = parseInt(binary.splice(0, 3).join(""), 2);
    if (version === 0) {
      // continue
    }
    versions.push(version);
    console.log("version", version, "typeId", typeId);
    if (typeId === 4) {
      console.log('***literal packet***')
      let binNum = [];
      let numberHeader = "1";
      do {
        const val = binary.splice(0, 5);
        numberHeader = val.splice(0, 1)[0];
        binNum.push(...val);
      } while (numberHeader === "1");
      const literalValue = parseInt(binNum.join(""), 2);
      console.log("literalValue", literalValue);
      // } else if (typeId === 3 || typeId === 6) {
    } else if (typeId !== 4) {
        // versions.push(...processPackets(binary));
      console.log('***operator packet***')
      const lengthTypeId = binary.splice(0, 1)[0];
        console.log('lengthTypeId', lengthTypeId)
      if (lengthTypeId === "0") {
        const bitsToTake = parseInt(binary.splice(0, 15).join(""), 2);
        const subPacketString = binary.splice(0, bitsToTake);
        if (subPacketString.length > 0) {
        versions.push(...processPackets(subPacketString));
        } else {
          return []
        }
      } else {
        const numberOfImmediateSubPackets = parseInt(
          binary.splice(0, 11).join(""),
          2
        ); // 5 is length of packet
        console.log("numberOfSubpackets", numberOfImmediateSubPackets);
        const subPackets = []
        for (let sp=0;sp<numberOfImmediateSubPackets;sp++) {
          // console.log('binary length', binary.length, 'iteration', sp)
          let packets = 0;
          while (binary[5 * packets + 6] === "1") {
            packets++;
            console.log("another packet");
          }
          const bitsToTake = 5 * (packets + 1) + 6; // 11 bits in a packet
          console.log("bits to take", bitsToTake, 'from binary', binary.length, 'on iteration', sp);
          const subPacketString = binary.splice(0, bitsToTake);
          subPackets.push(subPacketString)
          console.log('binary length', binary.length)
        }
        console.log('subPackets', subPackets)
        subPackets.forEach(sp => {
          versions.push(...processPackets(sp));
        })
        // if (numberOfImmediateSubPackets > 1) {
        //   let packets = 0;
        //   while (binary[5 * packets + 6] === "1") {
        //     packets++;
        //     numberOfImmediateSubPackets++;
        //     console.log("another packet");
        //   }
        //   const bitsToTake = 5 * (packets + 1) + 6; // 11 bits in a packet
        //   console.log("bits to take", bitsToTake);
        //   const subPacketString = binary.splice(0, bitsToTake);
        //   versions.push(...processPackets(subPacketString));
        // }
      }
    } else {
      console.error("Unrecognised typeId");
    }
  }
  return versions;
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
