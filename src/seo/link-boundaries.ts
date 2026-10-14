/**
 * Persian-aware word-boundary matching for contextual auto-links.
 *
 * Background: the blog auto-linker used a bare `indexOf`, so a rule phrase
 * could match *inside* a longer word -- live bugs seen 2026-10-14:
 * «پنچری» linked «چری» to the Chery brand page, and «شمالی» was split into
 * «شمال» + «ی». This helper only accepts matches whose neighbors are not
 * word characters (letters, digits, or ZWNJ U+200C).
 */

const WORD_CHAR = /[\p{L}\p{N}]/u;
const ZWNJ = "\u200C";

function isWordChar(char: string | undefined): boolean {
  if (char === undefined || char === "") return false;
  if (char === ZWNJ) return true;
  return WORD_CHAR.test(char);
}

/**
 * First index of `phrase` in `haystack` with clean word boundaries on both
 * sides, or -1. Later occurrences are tried when an early one sits inside
 * a longer word.
 */
export function findBoundedMatch(haystack: string, phrase: string): number {
  if (!phrase) return -1;
  let from = 0;
  for (;;) {
    const index = haystack.indexOf(phrase, from);
    if (index < 0) return -1;
    const before = index > 0 ? haystack[index - 1] : undefined;
    const afterIndex = index + phrase.length;
    const after = afterIndex < haystack.length ? haystack[afterIndex] : undefined;
    if (!isWordChar(before) && !isWordChar(after)) return index;
    from = index + 1;
  }
}
