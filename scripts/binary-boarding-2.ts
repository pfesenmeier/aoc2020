// day 5

import { columnNum, list, parseSeat, rowNum } from "./binary-boarding-1.ts";

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
  }
  private seats: boolean[][];
  fillSeat(seat: Seat): Airplane {
    if (seat.row === undefined || seat.column === undefined) {
      console.log(seat.column + " " + seat.row);
    } else {
      this.seats[seat.row][seat.column] = true;
    }
    return this;
  }
}

// function fillSeat(airplane: Airplane, seat: Seat): Airplane {
//     airplane.fillSeat
//     return airplane;
// }

const filledSeats = list
  .map((seatBinary) => parseSeat(seatBinary))
  .map((seat) => ({ row: rowNum(seat.row)!, column: columnNum(seat.column)! }))
  .reduce(
    (airplane: Airplane, seat: Seat) => airplane.fillSeat(seat),
    new Airplane(128, 8),
  );


// define space, fill it, see what's missing
// populate plane, check all possible keys, return what's missing
