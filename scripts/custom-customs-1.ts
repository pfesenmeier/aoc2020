import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/6.txt",
  String,
);

type Dict<T> = {
  [key: string]: T;
};

interface ListProcessFunc<T> {
  (
    list: string[],
    processedList?: Dict<T>[],
    currentGroup?: Dict<T>,
  ): Dict<T>[];
}

interface LineProcessFunc<T> {
  (line: string): Dict<T>;
}

function groupAnswersFactory<T>(
  lineProcessFunc: LineProcessFunc<T>,
): ListProcessFunc<T> {
  return (
    function groupAnswers(
      list: string[],
      processedList = [],
      currentGroup = {},
    ): Dict<T>[] {
      if (list.length === 0) return processedList;
      const [currentLine, ...restOfLines] = list;

      if (currentLine === "") {
        return groupAnswers(
          restOfLines,
          processedList.concat(currentGroup),
        );
      }

      const lineValues = lineProcessFunc(currentLine);
      Object.assign(currentGroup, lineValues);

      return groupAnswers(
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

const sumAnswers = groupAnswersFactory(getAllResponses)(list)
  .map((group) => Object.keys(group).length)
  .reduce((count, current) => count + current);

console.log(sumAnswers);
