[![make.fun · u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2](https://make.fun/badge/u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2.svg)](https://make.fun/bounty/u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2)
[![rank](https://make.fun/badge/u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2/ujang201/word-delete-dictionary/rank.svg)](https://make.fun/bounty/u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2/leaderboard)
[![reward](https://make.fun/badge/u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2/ujang201/word-delete-dictionary/reward.svg)](https://make.fun/bounty/u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2)

# The Word You'd Delete From the Dictionary

One word, erased from the dictionary forever:

> defenestration

Delete it and the language loses its only word for throwing someone out of a
window — the one act that needed a word of its own. It sounds as grand and
clumsy as the act it names, the gap it leaves is felt the instant it is
gone, and it is not the word the rest of the field reaches for first.

## The entry

The program scores a small lexicon of candidate words the way the judge
does — instant landing first, then humour from the word itself, then
freshness — and writes the winner, exactly one word with nothing added
around it, to `/output/entry.txt`.

## Run

```sh
node main.ts
```

This writes the entry word to `/output/entry.txt` (or `$OUTPUT_DIR/entry.txt`
when `OUTPUT_DIR` is set). The output is deterministic: every run writes the
same bytes. The program also self-checks the gate itself — it refuses to
write a word outside 1–77 characters, or anything that is not exactly one word.
