import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "fourteen";
  await test(day, 1, partOne, 1588);
  await solve(day, 1, partOne, 3342);
  await test(day, 2, partTwo, 2188189693529);
  // await solve(day, 2, partTwo, 1);
}

function processInput(
  input: Array<string>
): {
  rules: Map<string, string>;
  template: Array<string>;
  uniqueValues: Array<string>;
} {
  const template = input.shift()?.split("") ?? [];
  input.shift();
  const rules = new Map<string, string>();
  const uniqueValues: Array<string> = [];
  input.forEach((line) => {
    const [key, value] = line.split(" -> ");
    rules.set(key, value);
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  });
  return {
    rules,
    template,
    uniqueValues,
  };
}

function growPolymer(rules: Map<string, string>, template: Array<string>, stepCount: number): Array<string> {
  for (let step = 0; step < stepCount; step++) {
    const pairs = [];
    const lastItem = template.length - 1;
    for (let i = 0; i < lastItem; i++) {
      const pair = template[i] + template[i + 1];
      const rule = rules.get(pair);
      if (rule) {
        pairs.push(pair[0]);
        pairs.push(rule);
        if (i >= lastItem - 1) {
          pairs.push(pair[1]);
        }
      }
    }
    template = pairs;
  }
  return template
}

function calcElementDiff(
  uniqueValues: Array<string>,
  template: Array<string>
): number {
  // console.log("uniqueValues", uniqueValues);
  // console.log("template", template);
  const counts = new Array(uniqueValues.length).fill(0);
  template.forEach((c) => {
    uniqueValues.forEach((v, valIndex) => {
      if (v === c) {
        counts[valIndex]++;
      }
    });
  });

  counts.sort((a, b) => a - b);
  // console.log(counts);
  return counts[counts.length - 1] - counts[0];
}

function partOne(input: Array<string>): number {
  const processedInput = processInput(input);
  const { rules, uniqueValues } = processedInput;
  let { template } = processedInput;

  template = growPolymer(rules, template, 10)

  return calcElementDiff(uniqueValues, template);
}

function partTwo(input: Array<string>): number {
  const processedInput = processInput(input);
  const { rules, uniqueValues } = processedInput;
  let { template } = processedInput;

  // const map = new Map<string, string>()
  // generate initial pairs
  template = growPolymer(rules, template, 40)
  // for (let step = 0; step < 40; step++) {
  //   console.time(`step ${step} took`);
  //   console.time("dowork");
  //   // const pairs = [];
  //   const lastItem = template.length - 1;
  //   for (let i = 0; i < lastItem; i++) {
  //     const pair = template[i] + template[i + 1];
  //     const rule = rules.get(pair);
  //     if (rule) {
  //       let val = (pair[0])+ (rule);
  //       if (i >= lastItem - 1) {
  //         // pairs.push(pair[1]);
  //         val+=pair[1]
  //       }
  //       map.set(pair, val)
  //     }
  //   }
  //   console.timeEnd("dowork");
  //   // template = pairs;
  //   console.timeEnd(`step ${step} took`);
  // }

  return calcElementDiff(uniqueValues, template);
}

await run();
