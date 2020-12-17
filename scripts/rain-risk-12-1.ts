import { fileToList } from "../denoUtils/mod.ts";

class Move {
  constructor(readonly direction: direction, readonly distance: number) {}

  static parse(aocLine: string): Move | "" {
    const match = aocLine.match(/([A-Z])([0-9]+)/);
    if (!match) return "";
    return new Move(match[1], parseInt(match[2]));
  }
}

enum cardinalDirection {
  N,
  E,
  S,
  W,
}

type direction = 'N' | 'S' | 'E' | 'W' | 'R' | 'L' | 'F';

class Boat {
    private bearing = cardinalDirection.E;
    private verticle = 0;
    private horizontal = 0;

    sail(move: Move) {
      if (move.direction === 'F') this.sail(new Move(cardinalDirection[this.bearing] as direction, move.distance));
      if (move.direction === 'R') this.sail(new Move(cardinalDirection[((this.bearing + 1) % 4)] as direction, move.distance));
      if (move.direction === 'L') this.sail(new Move(cardinalDirection[(this.bearing - 1) % 4] as direction, move.distance));
      if (move.direction === 'N') 
      if (move.direction === 'S')
      if (move.direction === 'W')
      if (move.direction === 'E')
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
