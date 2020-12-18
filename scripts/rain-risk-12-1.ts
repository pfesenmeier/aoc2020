import { fileToList } from "../denoUtils/mod.ts";

class Move {
  constructor(readonly direction: command, readonly distance: number) {}

  static parse(aocLine: string): Move | "" {
    const match = aocLine.match(/([A-Z])([0-9]+)/);
    if (!match) return "";
    return new Move(match[1] as command, parseInt(match[2]));
  }
}

type command = 'N' | 'S' | 'E' | 'W' | 'R' | 'L' | 'F';

class Boat {
    private bearing = 90;
    private y = 0;
    private x = 0;

    sail(move: Move) {
      if (move.direction === 'F') 
      // f
      if (move.direction === 'R')
      // t
      if (move.direction === 'L')
      //t-
      if (move.direction === 'N') 
      //s 0 m
      if (move.direction === 'S')
      //s 0 -m
      if (move.direction === 'W')
      //s m 0
      if (move.direction === 'E')
      //s -m 0
    }
    //f a2 + b2 = c2
    // if < 90 
    forward(amount: number): void {
      const radians = this.bearing * Math.PI / 180;
      this.x += Math.cos(radians) * amount;
      this.y += Math.sin(radians) * amount;

    }
    slide(x: number, y: number): void {
       this.x += x;
       this.y += y;
    }
    turn(degrees: number): void {
      const new = degrees + this.degrees;
      if new > 180
    }
}

async function main() {
  const moves = await fileToList("./input/12.txt", Move.parse);
  console.log(moves);

  let direction = "E";
  let verticle = 0;
  let horizontal = 0;

  moves.filter((move) => move !== "")
    .map((move) => boat.move(move));
}

if (import.meta.main) main();
