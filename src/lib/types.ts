// --- Word Data ---
export interface Category {
  id: string;
  name_kh: string;
  words: string[];
}

export interface WordData {
  categories: Category[];
}

// --- Players ---
export interface Player {
  id: number;
  name: string;
  isImpostor: boolean;
  hasSeenRole: boolean;
}

// --- Game Phases ---
// This drives which screen is rendered. Explicit phases prevent
// "impossible states" (e.g. showing gameplay before roles are assigned).
export type GamePhase = "setup" | "reveal" | "gameplay";

// --- Core Game State ---
export interface GameState {
  phase: GamePhase;
  players: Player[];
  categoryId: string | "random";
  selectedCategory: Category | null;   // resolved category for this round
  secretWord: string | null;
  currentRevealIndex: number;          // which player is currently seeing their role
  isRoleVisible: boolean;              // is the secret currently shown on screen?
  startingPlayerId: number | null;     // who gives the first clue
  timerDuration: number;               // in seconds, e.g. 60
}

// --- Actions for the reducer ---
export type GameAction =
  | { type: "START_GAME"; payload: { playerNames: string[]; categoryId: string; timerDuration: number } }
  | { type: "REVEAL_ROLE" }
  | { type: "HIDE_ROLE_AND_ADVANCE" }
  | { type: "BEGIN_GAMEPLAY" }
  | { type: "RESET_GAME" };