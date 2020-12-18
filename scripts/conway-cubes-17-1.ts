import { fileToList }  from '../denoUtils/mod.ts';

const list = await fileToList('./input/17.txt', String);

// cube 
// if active, and 2-3 neighbors active, remains active; else inactive
// if inactive, and exactly three neighbors are active, becomes active
// cube is either inactive or active

class cube {
    public state: 'inactive' | 'active' = 'inactive';
    activate = () => this.state = 'active';
    inactivate = () => this.state = 'inactive';
    static activeCube() {
        const c = new cube();
        c.activate();
        return c;
    }
}

interface conwayCube {
    cycle: () => void;
    getNextState: (coord: string, state: cube["state"]) => cube["state"];
    countActiveNeighbors: (x: number, y: number, z: number) => number;
    isActive: (x: number, y: number, z: number) => boolean;
    getCubeCoordinates: () => Record<string, cube>;
    setNewState: () => void;
    loadCube: (cube: cube) => true;
}

class grid {
  private cubeRecord: Record<string, cube> = {};
  loadCube(x: number, y: number, z: number, cube: cube) {
      this.cubeRecord[`${x}-${y}-${z}`] = cube;
      return this;
  }
  print = () => Object.keys(this.cubeRecord).map(console.log);
}

const loadGrid = (list: string[]) => list
  .filter(line => line !== '')
  .map(line => line.match(/[\.#]+/)![0].split(''))
  .map((symbols, y) => symbols.map((symbol, x) => [x,y, symbol === '#' ? cube.activeCube() : new cube()] as [number, number, cube]))
  .flat()
  .reduce((g, c ) => g.loadCube(c[0], c[1], 0, c[2]), new grid());

loadGrid(list).print();





