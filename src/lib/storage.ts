const STORAGE_KEY = "impostor-game-last-names";

export function saveLastNames(names: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  } catch {
    // localStorage can fail in private browsing / storage-full edge cases — fail silently
  }
}

export function loadLastNames(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}