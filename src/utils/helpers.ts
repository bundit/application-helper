export function removeTrailingS(word: string) {
  if (word[word.length - 1] !== "s") {
    return word;
  }

  return word.slice(0, word.length - 1);
}
