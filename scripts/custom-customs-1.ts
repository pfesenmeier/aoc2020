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
  (aggregate: Dict<T>, current: Dict<T>): Dict<T>;
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
    ): Dict<T>[] {
      if (list.length === 0) return processedList;
      const [currentLine, ...restOfLines] = list;

      if (currentLine === "") {
        return processList(
          restOfLines,
          processedList.concat(currentGroup),
        );
      }

      return processList(
        restOfLines,
        processedList,
        aggregateFunc(currentGroup, lineProcessFunc(currentLine)),
      );
    }
  );
}

export const lineToObj: LineProcessFunc<boolean> = (line: string) =>
  line.split("")
    .reduce((obj, letter) => Object.assign(obj, { [letter]: true }), {});

function main() {

  const aggregateAllResonses: AggregateFunc<boolean> = (
    aggregate: Dict<boolean>,
    current: Dict<boolean>,
  ) => Object.assign(aggregate, current);

  const sumAnswers = listProcessFactory(
    lineToObj,
    aggregateAllResonses,
  )(list)
    .map((group) => Object.keys(group).length)
    .reduce((count, current) => count + current);

  console.log(sumAnswers);
}

if (import.meta.main) main();
