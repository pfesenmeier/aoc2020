import { remoteFileToList } from "../denoUtils/mod.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/10.txt",
  Number,
);

function main() {
    list.pop();

    const adapterArray = connectToWall(list.sort());
    console.log('match length: ' + adapterArray!.length + 'list length: ' + list.length);
} 

function connectToWall(adapterVoltages: Readonly<number>[]): number[] | undefined {
  const totalPlugs = adapterVoltages.length;

  function plugIsCompatible(femaleEnd: Readonly<number>, maleEnd: Readonly<number>, maxDifference = 3): boolean {
      const voltageDifference = maleEnd - femaleEnd;
      return voltageDifference > 0 && voltageDifference <= maxDifference;
  }

  function getOpenPlug(plugTower: Readonly<number>[]): number {
      if (plugTower === undefined) throw new Error('found undefined in getOpenPlug');
      return plugTower[plugTower.length - 1];
  }

  function plugsAvailable(plugPool: Readonly<number>[]): boolean {
      return plugPool.length > 0;
  }

  function plugInPlug(plugTower: Readonly<number>[], plug: Readonly<number>): number[] {
      return plugTower.concat(plug);
  }

  function removePlug(plugPool: Readonly<number>[], plug: Readonly<number>): number[] {
      const plugIndex = plugPool.indexOf(plug);
      if (plugIndex < 0) throw new Error('Error in remove plug!');
      const newPool = plugPool.slice();
      plugPool.splice(plugIndex, 1);
      if (newPool === undefined) throw new Error('splice function not working');
      return newPool;
  }

  function plugOneAdapterIn(plugsPluggedIn: Readonly<number>[], availablePlugs: Readonly<number>[]): number[] | undefined {
      console.log(plugsPluggedIn.length);
      if (!plugsAvailable(availablePlugs)) return plugsPluggedIn;
      
      const openPlug = getOpenPlug(plugsPluggedIn);

      for (let i = 1; i < 4; i++) {
        const compatiblePlugs = availablePlugs.filter(plug => plugIsCompatible(openPlug, plug, i));    
        if (plugsAvailable(compatiblePlugs)) {
            const list = plugOneAdapterIn(plugInPlug(plugsPluggedIn, compatiblePlugs[0]), removePlug(availablePlugs, compatiblePlugs[0]));
            if (list && list.length === totalPlugs) return list;
        }
      }

      return [];
    }

    function maximizeAdapterLength(plugsPluggedIn: Readonly<number>[], availablePlugs: Readonly<number>[]): number[] {
      console.log(plugsPluggedIn.length);
      console.log(availablePlugs);
      if (!plugsAvailable(availablePlugs)) return plugsPluggedIn;
      const openPlug = getOpenPlug(plugsPluggedIn);

      const choices = availablePlugs.filter(plug => plugIsCompatible(openPlug, plug));
    //   const uniqueChoices = choices.filter((v, i, a) => a.indexOf(v) === i);
      if (!plugsAvailable(choices)) return plugsPluggedIn;
      const lists = [] as number[][];
      choices.forEach(choice => {
          const tower = plugInPlug(plugsPluggedIn, choice);
          const pool = removePlug(availablePlugs, choice);

          lists.push(maximizeAdapterLength(tower, pool));
      });

      const largestList = lists!.reduce((largest, current) => current.length > largest.length? current : largest);

      return largestList;

      // with
      // without
      // if with > without, with, else without

    }

    return maximizeAdapterLength([0], adapterVoltages);
}

if (import.meta.main) main();
