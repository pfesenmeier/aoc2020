import { readLines } from "https://deno.land/std@0.79.0/io/mod.ts";
import * as path from "https://deno.land/std@0.79.0/path/mod.ts";



interface ParseFunc<T> {
    (line: string): T;
}

// https://deno.land/std@0.79.0/examples/cat.ts
export async function fileToList<T>(fileName: string, parseFunc: ParseFunc<T>): Promise<T[]> {
    const filePath = path.join(Deno.cwd(), fileName);
    const file = await Deno.open(filePath);
    
    const list: Array<T> = [];
    for await (const line of readLines(file)) {
      list.push(parseFunc(line));
    }

    file.close();
    
    return list;
}