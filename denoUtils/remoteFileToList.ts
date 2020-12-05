import { readLines } from "https://deno.land/std@0.79.0/io/mod.ts";
import { readerFromStreamReader } from "https://deno.land/std@0.79.0/io/mod.ts";

interface ParseFunc<T> {
    (line: string): T;
}

export async function remoteFileToList<T>(url: string, parseFunc: ParseFunc<T>): Promise<T[]> {
    const res = await fetch(url);
    const reader = readerFromStreamReader(res.body!.getReader());

    const list: Array<T> = [];
    for await (const line of readLines(reader)) {
      list.push(parseFunc(line));
    }

    return list;
}