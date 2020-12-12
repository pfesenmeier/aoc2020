import { parse } from "https://deno.land/std@0.80.0/flags/mod.ts";
import { readLines } from "https://deno.land/std@0.79.0/io/mod.ts";

const decoder = new TextDecoder();

// https://deno.land/std@0.80.0/examples/catj.ts#L83
if (import.meta.main) {
  const parsedArgs = parse(Deno.args);

  if (parsedArgs.h || parsedArgs.help || parsedArgs._.length === 0) {
    console.log("Usage: <script> [-h|--help] [file...]");
    console.log();
    console.log("Examples:");
    console.log();
    console.log("<script> file.txt");
    console.log("from stdin: cat file.json | <script> -");
  }

  if (parsedArgs._[0] === "-") {
    // const contents = await Deno.readAll(Deno.stdin);
    // console.log(decoder.decode(contents));
    for await (const line of readLines(Deno.stdin)) {
      console.log(line);
    }
  } else {
    const fileContents = await Deno.open(parsedArgs._[0].toString());
    for await (const line of readLines(fileContents)) {
       console.log(line)
    }
  }
}
