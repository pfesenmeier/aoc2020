import { parseTextFile } from "../denoUtils/mod.ts";

const list = await parseTextFile(Deno.args, String);

let buses = list[1].split(",")
  .map((num, index) => {
    const numberOrX = parseInt(num) || num;
    if (typeof numberOrX === 'number') {
      return [numberOrX, index];
    } else {
      return [-1, -1];
    }    
  }).filter(nums => nums[0] !== -1);

function tic() {
  buses = buses.map(bus => { bus[1] += 1; return bus; });
}
console.log(buses);

function isMatch(firstBus: number[], bus: number[] {
 
  
