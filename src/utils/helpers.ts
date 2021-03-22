import { UserContentItem } from "../@types";

export function removeTrailingS(word: string) {
  if (word[word.length - 1] !== "s") {
    return word;
  }

  return word.slice(0, word.length - 1);
}

export function saveItems(key: string, items: UserContentItem[] | string[]) {
  try {
    const serializedItems = JSON.stringify(items);

    localStorage.setItem(key, serializedItems);
  } catch (err) {
    console.error(err);
  }
}

export function loadItems(key: string) {
  try {
    const serializedItems = localStorage.getItem(key);
    // If null, no persisted state exists
    if (serializedItems === null || serializedItems === "null") {
      return [];
    }

    return JSON.parse(serializedItems);
  } catch (err) {
    return [];
  }
}
