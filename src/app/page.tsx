"use client";

import { useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gameReducer, initialGameState } from "@/lib/gameLogic";
import SetupScreen from "@/components/SetupScreen";
import PassAndPlayScreen from "@/components/PassAndPlayScreen";
import GameplayScreen from "@/components/GameplayScreen";

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <AnimatePresence mode="wait">
      {state.phase === "setup" && (
        <motion.div
          key="setup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SetupScreen
            onStart={(config) =>
              dispatch({ type: "START_GAME", payload: config })
            }
          />
        </motion.div>
      )}

      {state.phase === "reveal" && state.selectedCategory && state.secretWord && (
        <motion.div
          key="reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PassAndPlayScreen
            players={state.players}
            currentRevealIndex={state.currentRevealIndex}
            isRoleVisible={state.isRoleVisible}
            selectedCategory={state.selectedCategory}
            secretWord={state.secretWord}
            onReveal={() => dispatch({ type: "REVEAL_ROLE" })}
            onHideAndAdvance={() => dispatch({ type: "HIDE_ROLE_AND_ADVANCE" })}
          />
        </motion.div>
      )}

      {state.phase === "gameplay" && state.selectedCategory && (
        <motion.div
          key="gameplay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GameplayScreen
            players={state.players}
            startingPlayerId={state.startingPlayerId}
            selectedCategory={state.selectedCategory}
            timerDuration={state.timerDuration}
            onReset={() => dispatch({ type: "RESET_GAME" })}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}