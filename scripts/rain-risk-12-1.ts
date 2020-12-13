import { parseTextFile } from '../denoUtils/mod.ts';

class Move {
  constructor(readonly direction: string, readonly distance: number) {}
  
 static parse(aocLine: string): Move | '' {
		const match = aocLine.match(/([A-Z])([0-9]+)/);
    if (!match) return ''; 
    return new Move(match[1], parseInt(match[2]));
  }
} 

async function main() {
	const moves = await parseTextFile(Deno.args, Move.parse);
	console.log(moves);
}

if (import.meta.main) main();
