import { decode, encode } from "https://deno.land/std@0.51.0/encoding/utf8.ts";
import { BufReader, readLines } from "https://deno.land/std@0.51.0/io/bufio.ts";
import { rgb24 } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import {
  readFileStr,
} from "https://deno.land/std@0.51.0/fs/read_file_str.ts";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

const options = {
  // To animate or not (only works if the sleep module is available)
  animate: false,
  // Duration of the animation
  duration: 12,
  // Seed of the rainbow, use the same for the same pattern
  seed: 0,
  // Animation speed
  speed: 20,
  // Spread of the rainbow
  spread: 8.0,
  // Frequency of the rainbow colors
  freq: 0.3,
};

const rainbow = function (freq: number, i: number): Rgb {
  let red = Math.round(Math.sin(freq * i + 0) * 127 + 128);
  let green = Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128);
  let blue = Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128);

  return {
    r: red,
    g: green,
    b: blue,
  };
};

const colorize = function (char: string, colors: Rgb) {
  Deno.stdout.writeSync(
    encode(
      rgb24(char, colors),
    ),
  );
};

const println = function (line: string) {
  for (let i = 0; i < line.length; i++) {
    colorize(line[i], rainbow(options.freq, options.seed + i / options.spread));
  }

  Deno.stdout.writeSync(
    encode("\n"),
  );
};

const fromPipe = async function () {
  for await (const line of readLines(Deno.stdin)) {
    options.seed += 1;
    println(line);
  }
};

const fromFile = async function (file: string) {
  const f = await Deno.open(file);
  const bufReader = new BufReader(f);

  let line: string | any;
  while ((line = await bufReader.readString("\n")) !== null) {
    options.seed += 1;
    println(line);
  }
  f.close();
};

export {
  options,
  println,
  rainbow,
  fromPipe,
  fromFile,
};
