This is a Deno port of the [node port](https://github.com/robertmarsal/lolcatjs) of the famous [lolcat](https://github.com/busyloop/lolcat) gem.

## Installation

```
deno install https://deno.land/x/lolcat/lolcat.ts
```

## Examples

**Output of other command:**

```
fortune | lolcat
```

**Text in a file:**

```
deno run --allow-read https://deno.land/x/lolcat/lolcat.ts printme.txt
```

## Screenshot

![lolcatjs](/screenshot.png)

## License

WTFPL
