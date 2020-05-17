import * as print from "./print.ts";
import { parse } from "https://deno.land/std@0.51.0/flags/mod.ts";

var args = parse(Deno.args, {
  alias: {
    h: "help",
    p: "spread",
    F: "freq",
    S: "seed",
    d: "duration",
    s: "speed",
  },
});

function rand(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function help() {
  var help = `
Usage: lolcat [OPTION]... [FILE]...

Concatenate FILE(s), or standard input, to standard output.
With no FILE, or when FILE is -, read standard input.

    --spread, -p <f>:   Rainbow spread (default: 8.0)
      --freq, -F <f>:   Rainbow frequency (default: 0.3)
      --seed, -S <i>:   Rainbow seed, 0 = random (default: 0)
  --duration, -d <i>:   Animation duration (default: 12)
     --speed, -s <f>:   Animation speed (default: 20.0)
          --help, -h:   Show this message

Examples:
  lolcat f - g     Output f's contents, then stdin, then, g's contents.
  lolcat           Copy standard input to standard output.
  fortune | lolcat Display a rainbow cookie.

Report bugs to <https://github.com/qwerttty/lolcat/issues>
Home page: <https://github.com/qwerttty/lolcat/>`;

  var i = 20;
  var o = rand(256);
  var lines = help.split("\n");

  for (var line in lines) {
    i -= 1;
    print.options.seed = o + i;
    print.println(lines[line]);
  }

  Deno.exit();
}

function init(args: any) {
  if (args.help) {
    help();
  }

  if (args.spread) {
    print.options.spread = args.spread;
  }

  if (args.freq) {
    print.options.freq = args.freq;
  }

  if (args.seed) {
    print.options.seed = args.seed;
  }

  if (args.duration) {
    print.options.duration = args.duration;
  }

  if (args.speed) {
    print.options.speed = args.speed;
  }

  if (args._.length === 0) {
    if (print.options.seed === 0) {
      print.options.seed = rand(256);
    }

    print.fromPipe();
  } else {
    args._.forEach(function (file: string) {
      if (file === "-") {
        print.fromPipe();
      } else {
        print.fromFile(file);
      }
    });
  }
}

init(args);
