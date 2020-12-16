import { difference } from "https://deno.land/std@0.81.0/datetime/mod.ts";

const start = new Date();

const input = "6,3,15,13,1,0";
const history = input.split(",");
const lookup = input.split(",").reduce((acc, cur, index) => {
  acc[cur] = index + 1;
  return acc;
}, {} as Record<string, number>);

let length: number = history.length;
let value: string = history[length - 1];

while (length < 30000000) {  // add more elements
  const lastOccurance = lookup[value];
  
  if (lastOccurance === undefined) {
    lookup[value] = length;
    value = '0';
  } else {
    const diff = length - lastOccurance;
    lookup[value] = length;
    value = diff.toString();
  }
  ++length;
}
const end = new Date();
console.log(value);
console.log(difference(start, end, { units: ['seconds'] }));
