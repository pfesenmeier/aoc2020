import { fileToList } from "../denoUtils/mod.ts";

const list = await fileToList("./input/17.txt", String);

// cube
// if active, and 2-3 neighbors active, remains active; else inactive
// if inactive, and exactly three neighbors are active, becomes active
// cube is either inactive or active

class cube {
  public state: "inactive" | "active" = "inactive";
  activate = () => this.state = "active";
  inactivate = () => this.state = "inactive";
  static activeCube() {
    const c = new cube();
    c.activate();
    return c;
  }
}

interface conwayCube {
  cycle: () => void;
  getNextState: (coord: string, state: cube["state"]) => cube;
  countActiveNeighbors: (x: number, y: number, z: number) => number;
  isActive: (x: number, y: number, z: number) => boolean;
  getCubeCoordinates: () => Record<string, cube>;
  setNewState: () => void;
  loadCube: (cube: cube) => true;
}

class grid {
  private cubeRecord: Record<string, cube> = {};
  private maxRadius = [[-1, 7], [-1, 7], [-1, 1]];

  cycle = () => {
    const [x1, x2, y1, y2, z1, z2] = this.maxRadius.flat();
    const newState: Record<string, cube> = {};
    for (const x of range(x1, x2)) {
      for (const y of range(y1, y2)) {
        for (const z of range(z1, z2)) {
          //   console.log(x + ' ' + y + ' ' + z);
          newState[`${x}-${y}-${z}`] = this.getNextState(x, y, z);
        }
      }
    }
    this.cubeRecord = newState;
    this.expandMaxRadius();
  };

  countActive = () =>
    Object.values(this.cubeRecord).reduce(
      (tot, cube) => cube.state === "active" ? ++tot : tot,
      0,
    );

  private expandMaxRadius() {
    const m = this.maxRadius.flat();
    this.maxRadius = [[--m[0], ++m[1]], [--m[2], ++m[3]], [--m[4], ++m[5]]];
  }

  private getNextState(x: number, y: number, z: number): cube {
    const c = this.cubeRecord[`${x}-${y}-${z}`] ?? new cube();
    const count = this.countActiveNeighbors(x, y, z);
    // console.log(count);
    if (c.state === "active") {
      if (count === 2 || count === 3) {
        return cube.activeCube();
      } else {
        return new cube();
      }
    }
    if (count === 3) {
      return cube.activeCube();
    }
    return new cube();
  }

  private countActiveNeighbors(x: number, y: number, z: number): number {
    let count = 0;
    for (const a of [x - 1, x, x + 1]) {
      for (const b of [y - 1, y, y + 1]) {
        for (const c of [z - 1, z, z + 1]) {
          if (a !== x && b !== y && c !== z) {
            if (this.cubeRecord[`${a}-${b}-${c}`]?.state === "active") {
              ++count;
            }
          }
        }
      }
    }
    if (count > 0) console.log(count);
    return count;
  }

  loadCube(x: number, y: number, z: number, cube: cube) {
    this.cubeRecord[`${x}-${y}-${z}`] = cube;
    return this;
  }
  print = () => Object.values(this.cubeRecord);
}

const loadGrid = (list: string[]) =>
  list
    .filter((line) => line !== "")
    .map((line) => line.match(/[\.#]+/)![0].split(""))
    .map((symbols, y) =>
      symbols.map((symbol, x) =>
        [x, y, symbol === "#" ? cube.activeCube() : new cube()] as [
          number,
          number,
          cube,
        ]
      )
    )
    .flat()
    .reduce((g, c) => g.loadCube(c[0], c[1], 0, c[2]), new grid());

// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
function range(start: number, stop: number, step = 1): number[] {
  var a = [start], b = start;
  while (b < stop) {
    a.push(b += step);
  }
  return a;
}

const energySource = loadGrid(list);
energySource.cycle();
