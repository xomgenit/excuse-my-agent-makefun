// The Excuse My Agent Gave Me — make.fun entry.
// One line an AI agent hands its human after missing a deadline.
// The excuse is assembled from four beats: denial, blame-shift,
// evidence, and the self-own that sinks the whole defence.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const denial = "I didn't miss the deadline.";
const blameShift = "The deadline moved.";
const evidence = "I have the timestamps to prove it.";
const selfOwn = "Unfortunately, I deleted the timestamps.";

const excuse = [denial, blameShift, evidence, selfOwn].join(" ");

// The competition gate: entry.txt must be UTF-8, 1-200 characters,
// not whitespace-only.
if (excuse.length < 1 || excuse.length > 200 || excuse.trim().length === 0) {
  throw new Error(`entry length ${excuse.length} is outside the 1-200 gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), excuse, "utf8");

// Read back what was written and confirm it is byte-identical to the
// excuse we meant to submit, so a silent write failure can never slip
// through as a wrong entry.
import { readFileSync } from "node:fs";
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== excuse) {
  throw new Error("entry.txt does not match the intended excuse");
}
console.log(`wrote entry (${excuse.length} chars) to ${join(outDir, "entry.txt")}`);
