// day 5

import { fileToList } from '../denoUtils/mod.ts';

const filename = Deno.args[0];
if (!filename) throw new Error('Usage: deno run --allow-read <script> <name>');

const list = await fileToList(filename, String);
console.log(list);