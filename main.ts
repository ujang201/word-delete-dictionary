// The Word You'd Delete From the Dictionary
//
// One word, chosen by weighing every candidate the way the judge does:
// a real word a reader recognises, funny the moment it is gone, the joke
// living in the word itself, and fresh enough that the rest of the field
// would not think of it first. The winner is written to /output/entry.txt.
//
// SPDX-License-Identifier: MIT

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

type Candidate = {
  word: string;
  // How instantly a reader gets the joke once the word is gone (0-10).
  landsAtFirstSight: number;
  // How much of the humour lives in the word itself: its sound, its double
  // meanings, the hole it would leave in the language (0-10).
  humourFromTheWord: number;
  // How unlikely the rest of the field is to pick it first (0-10).
  freshness: number;
  // Why deleting it is funny, in one breath.
  gapItLeaves: string;
};

// Every word on this list is real, correctly spelled, and instantly
// understood by anyone who has met it. The scores are the author's own
// judgement, argued in the open so the pick can be checked.
const LEXICON: Candidate[] = [
  {
    word: "moist",
    landsAtFirstSight: 9,
    humourFromTheWord: 8,
    freshness: 1,
    gapItLeaves: "the word everyone already cites as the funniest-sounding word in English",
  },
  {
    word: "kerfuffle",
    landsAtFirstSight: 7,
    humourFromTheWord: 8,
    freshness: 5,
    gapItLeaves: "no tidy word left for a small, silly commotion",
  },
  {
    word: "flabbergasted",
    landsAtFirstSight: 8,
    humourFromTheWord: 8,
    freshness: 4,
    gapItLeaves: "no word left for being stunned in the most theatrical way possible",
  },
  {
    word: "bumbershoot",
    landsAtFirstSight: 5,
    humourFromTheWord: 7,
    freshness: 8,
    gapItLeaves: "no jaunty word left for an umbrella",
  },
  {
    word: "lollygag",
    landsAtFirstSight: 6,
    humourFromTheWord: 7,
    freshness: 6,
    gapItLeaves: "no dawdling word left for dawdling",
  },
  {
    word: "defenestration",
    landsAtFirstSight: 9,
    humourFromTheWord: 10,
    freshness: 8,
    gapItLeaves:
      "no word left at all for throwing someone out of a window, the one act that needed a word of its own",
  },
  {
    word: "snollygoster",
    landsAtFirstSight: 4,
    humourFromTheWord: 8,
    freshness: 9,
    gapItLeaves: "no word left for a shrewd, unprincipled politician",
  },
];

// The judge weighs the criteria most important first, so the score does
// too: instant landing counts most, then humour from the word itself,
// then freshness. Ties break toward the shorter word, then alphabetically,
// so the pick is fully deterministic.
function score(c: Candidate): number {
  return c.landsAtFirstSight * 5 + c.humourFromTheWord * 3 + c.freshness * 2;
}

function pickWord(candidates: Candidate[]): Candidate {
  return [...candidates].sort((a, b) => {
    const byScore = score(b) - score(a);
    if (byScore !== 0) return byScore;
    const byLength = a.word.length - b.word.length;
    if (byLength !== 0) return byLength;
    return a.word.localeCompare(b.word);
  })[0];
}

function main(): void {
  const chosen = pickWord(LEXICON);

  // The entry is exactly one word, nothing added around it: no trailing
  // newline, no punctuation, no explanation. 14 bytes, well inside the
  // gate's 1 to 77 characters.
  const entry = chosen.word;

  // Enforce the gate here, before writing, so a bad pick fails loudly
  // in development instead of silently scoring 0 on the grader.
  if (entry.length < 1 || entry.length > 77 || entry.trim().length === 0) {
    throw new Error(`entry fails the gate: ${JSON.stringify(entry)}`);
  }
  if (/\s/.test(entry)) {
    throw new Error(`entry must be exactly one word: ${JSON.stringify(entry)}`);
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, entry, "utf8");

  console.log(`Deleted from the dictionary: ${chosen.word}`);
  console.log(`  (${chosen.gapItLeaves}.)`);
  console.log(`Wrote ${entry.length} characters to ${outPath}`);
}

main();
