import { remoteFileToList } from "../denoUtils/mod.ts";

export const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/5example.txt",
  String,
);

export type Dict<T> = {
  [key: string]: T;
};

export interface ListProcessFunc<T> {
  (
    list: string[],
    processedList?: Dict<T>[],
    currentGroup?: Dict<T>,
  ): Dict<T>[];
}

export interface LineProcessFunc<T> {
  (line: string): Dict<T>;
}

export interface AggregateFunc<T> {
  (aggregate: [Dict<T>,Dict<T>], current: Dict<T>): [Dict<T>,Dict<T>];
}

export function listProcessFactory<T>(
  lineProcessFunc: LineProcessFunc<T>,
  aggregateFunc: AggregateFunc<T>,
): ListProcessFunc<T> {
  return (
    function processList(
      list: string[],
      processedList = [],
      currentGroup = {},
      currentUnmatchedGroup = {},
    ): Dict<T>[] {
      if (list.length === 0) return processedList;
      const [currentLine, ...restOfLines] = list;

      if (currentLine === "") {
        return processList(
          restOfLines,
          processedList.concat(currentGroup),
        );
      }
      const lineDict = lineProcessFunc(currentLine);
      
      const [matched, unmatched] = aggregateFunc([currentGroup, currentUnmatchedGroup], lineDict);
      return processList(
        restOfLines,
        processedList,
        matched,
        unmatched,
      );
    }
  );
}

export const lineToObj: LineProcessFunc<boolean> = (line: string) =>
  line.split("")
    .reduce((obj, letter) => Object.assign(obj, { [letter]: true }), {});

// function main() {

//   const aggregateAllResonses: AggregateFunc<boolean> = (
//     aggregate: Dict<boolean>,
//     current: Dict<boolean>,
//   ) => Object.assign(aggregate, current);

//   const sumAnswers = listProcessFactory(
//     lineToObj,
//     aggregateAllResonses,
//   )(list)
//     .map((group) => Object.keys(group).length)
//     .reduce((count, current) => count + current);

//   console.log(sumAnswers);
// }

// if (import.meta.main) main();
