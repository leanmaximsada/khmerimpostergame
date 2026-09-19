import { Player, GameState, GameAction, Category, WordData } from "./types";
import wordData from "@/data/words";

// ---------- Pure Helper Functions ----------

/** Fisher-Yates shuffle — unbiased, standard for games like this */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Picks a category. If "random", pick any category at random. */
function resolveCategory(categoryId: string): Category {
  const data = wordData as WordData;
  if (categoryId === "random") {
    const randomIndex = Math.floor(Math.random() * data.categories.length);
    return data.categories[randomIndex];
  }
  const found = data.categories.find((c) => c.id === categoryId);
  if (!found) throw new Error(`Category not found: ${categoryId}`);
  return found;
}

/** Picks one random word from a category */
function pickWord(category: Category): string {
  const idx = Math.floor(Math.random() * category.words.length);
  return category.words[idx];
}

/** Builds the initial player list with exactly one random impostor */
function assignPlayers(names: string[]): Player[] {
  const impostorIndex = Math.floor(Math.random() * names.length);
  return names.map((name, index) => ({
    id: index,
    name: name.trim() || `អ្នកលេង ${index + 1}`,
    isImpostor: index === impostorIndex,
    hasSeenRole: false,
  }));
}

// ---------- Initial State ----------

export const initialGameState: GameState = {
  phase: "setup",
  players: [],
  categoryId: "random",
  selectedCategory: null,
  secretWord: null,
  currentRevealIndex: 0,
  isRoleVisible: false,
  startingPlayerId: null,
  timerDuration: 60,
};

// ---------- Reducer ----------

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      const { playerNames, categoryId, timerDuration } = action.payload;
      const players = assignPlayers(playerNames);
      const selectedCategory = resolveCategory(categoryId);
      const secretWord = pickWord(selectedCategory);

      return {
        ...initialGameState,
        phase: "reveal",
        players,
        categoryId,
        selectedCategory,
        secretWord,
        timerDuration,
        currentRevealIndex: 0,
        isRoleVisible: false,
      };
    }

    case "REVEAL_ROLE": {
      return { ...state, isRoleVisible: true };
    }

    case "HIDE_ROLE_AND_ADVANCE": {
      const players = state.players.map((p, i) =>
        i === state.currentRevealIndex ? { ...p, hasSeenRole: true } : p
      );

      const nextIndex = state.currentRevealIndex + 1;
      const allSeen = nextIndex >= players.length;

      if (allSeen) {
        // Pick random starting player and move to gameplay
        const startingPlayer = players[Math.floor(Math.random() * players.length)];
        return {
          ...state,
          players,
          phase: "gameplay",
          isRoleVisible: false,
          startingPlayerId: startingPlayer.id,
        };
      }

      return {
        ...state,
        players,
        currentRevealIndex: nextIndex,
        isRoleVisible: false,
      };
    }

    case "RESET_GAME": {
      return initialGameState;
    }

    default:
      return state;
  }
}