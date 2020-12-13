import { parse } from "https://deno.land/std@0.80.0/flags/mod.ts";
import { readLines } from "https://deno.land/std@0.79.0/io/mod.ts";

// https://deno.land/std@0.80.0/examples/catj.ts#L83
export async function parseTextFile<T>(args: string[], parseFunc: (line: string) => T): Promise<(T | '')[]> {
  const parsedArgs = parse(args);

  if (parsedArgs.h || parsedArgs.help || parsedArgs._.length === 0) {
    console.log("Usage: <script> [-h|--help] [file...]");
    console.log();
    console.log("Examples:");
    console.log();
    console.log("<script> file.txt");
    console.log("from stdin: cat file.json | <script> -");
  }

  const output: (T | '')[] = [];
  const firstArg = parsedArgs._[0];
  
  const reader = firstArg === '-' ? Deno.stdin : await Deno.open(firstArg.toString());

  for await (const line of readLines(reader)) {
    output.push(parseFunc(line)); 
  }

  // ensure output always ends in ''
  if (output.slice(-1)[0]) output.push('');
  
  return output;
}
