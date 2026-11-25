import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I resign from the witness protection program: after years of hiding other people, I've decided to disappear myself.";

function main(): void {
  // Validation: exactly one line, 1-140 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
  }
  if (/\r|\n/.test(LINE)) {
    throw new Error("entry must be exactly one line");
  }
  // UTF-8 byte-length guard: the entry must fit in 140 bytes as UTF-8.
  if (Buffer.byteLength(LINE, "utf8") > 140) {
    throw new Error(
      `entry must be at most 140 UTF-8 bytes, got ${Buffer.byteLength(LINE, "utf8")}`
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
}

main();
