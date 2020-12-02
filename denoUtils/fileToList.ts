import { readLines } from "https://deno.land/std@0.79.0/io/mod.ts";
import * as path from "https://deno.land/std@0.79.0/path/mod.ts";



interface ParseFunc<T> {
    (line: string): T;
}

// https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
export default async function proccessFileIntoList<T>(file: string, parseFunc: ParseFunc<T>): Promise<T[]> {
    const filename = path.join(Deno.cwd(), file);
    const fileReader = await Deno.open(filename);
    
    const list: Array<T> = [];
    for await (const line of readLines(fileReader)) {
      list.push(parseFunc(line));
    }

    return list;
}