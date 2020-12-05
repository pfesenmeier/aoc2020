// day 5

import {
  calculateSeatId,
  columnNum,
  list,
  parseSeat,
  rowNum,
} from "./binary-boarding-1.ts";

type Seat = {
  row: number;
  column: number;
};

class Airplane {
  constructor(rows: number, columns: number) {
    this.seats = [];
    for (let i = 0; i < rows; i = i + 1) {
      this.seats.push([]);
    }
    this.rows = rows;
    this.columns = columns;
  }

  private seats: boolean[][];
  public rows: number;
  public columns: number;

  fillSeat(seat: Seat): Airplane {
    this.seats[seat.row][seat.column] = true;
    return this;
  }

  findEmptySeats(): string[] {
    const emptySeats = [];
    for (let i = 0; i < this.rows; i = i + 1) {
      for (let j = 0; j < this.columns; j = j + 1) {
        if (this.seats[i][j] === undefined) {
          emptySeats.push(
            `Empty seat @ row ${i} column ${j} seatId ${calculateSeatId(i, j)}`,
          );
        }
      }
    }
    return emptySeats;
  }
}

if (import.meta.main) {
  const filledSeats = list
    .map((seatBinary) => parseSeat(seatBinary))
    .map((seat) => ({
      row: rowNum(seat.row)!,
      column: columnNum(seat.column)!,
    }))
    .reduce(
      (airplane: Airplane, seat: Seat) => airplane.fillSeat(seat),
      new Airplane(128, 8),
    );

  console.log(filledSeats.findEmptySeats());
}
