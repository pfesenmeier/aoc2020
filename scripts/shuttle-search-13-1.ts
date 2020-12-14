import { parseTextFile } from '../denoUtils/mod.ts';

const list = await parseTextFile(Deno.args, String);

const timeStamp: number = parseInt(list[0])!;

const buses = list[1].split(',')
                     .filter(numOrX => parseInt(numOrX))
                     .map(nums => parseInt(nums));

type BusIdAndWaitTime = [number, number];

const busResults: BusIdAndWaitTime[] = buses.map(id => {
		let waitTime = 0;
    while(waitTime < timeStamp) {
      waitTime = waitTime + id;
    }
    return [id, waitTime - timeStamp];
  }
);

const resultOfSoonestBus = busResults.reduce((soonest, current) =>
  current[1] < soonest[1] ? current : soonest);

console.log(resultOfSoonestBus.reduce((prod, cur) => prod * cur));
