// day 5

import { remoteFileToList } from "../denoUtils/mod.ts";

export const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/5.txt",
  String,
);

export function parseSeat(seat: string) {
  return {
    row: seat.slice(0, 7),
    column: seat.slice(7),
  };
}

export function rowNum(
  rowBinary: string,
  min = 0,
  max = 127,
): number | undefined {
  if (rowBinary === "F") return min;
  if (rowBinary === "B") return max;

  if (rowBinary[0] === "F") {
    return rowNum(
      rowBinary.slice(1),
      min,
      Math.floor((min + max) / 2),
    );
  }
  if (rowBinary[0] === "B") {
    return rowNum(
      rowBinary.slice(1),
      Math.round((min + max) / 2),
      max,
    );
  }
}

export function columnNum(
  columnBinary: string,
  min = 0,
  max = 7,
): number | undefined {
  if (columnBinary === "L") return min;
  if (columnBinary === "R") return max;

  if (columnBinary[0] === "L") {
    return columnNum(
      columnBinary.slice(1),
      min,
      Math.floor((min + max) / 2),
    );
  }
  if (columnBinary[0] === "R") {
    return columnNum(
      columnBinary.slice(1),
      Math.round((min + max) / 2),
      max,
    );
  }
}

export function calculateSeatId(row: number, column: number) {
  return row * 8 + column;
}

if (import.meta.main) {
  const highestId = list
    .map((seat) => parseSeat(seat))
    .map((seat) => rowNum(seat.row)! * 8 + columnNum(seat.column)!)
    .reduce((highest, current) => current > highest ? current : highest);

  console.log(highestId);
}
