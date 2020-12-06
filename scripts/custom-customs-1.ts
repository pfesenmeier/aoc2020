import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/6.txt",
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

export function listProcessFactoryFactory<T>(
  lineProcessFunc: LineProcessFunc<T>,
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

      const lineValues = lineProcessFunc(currentLine);
      Object.assign(currentGroup, lineValues);

      return processList(
        restOfLines,
        processedList,
        currentGroup,
      );
    }
  );
}

const getAllResponses: LineProcessFunc<boolean> = (line: string) =>
  line.split("")
    .reduce((obj, letter) => Object.assign(obj, { [letter]: true }), {});

const sumAnswers = listProcessFactoryFactory(getAllResponses)(list)
  .map((group) => Object.keys(group).length)
  .reduce((count, current) => count + current);

console.log(sumAnswers);
