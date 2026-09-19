"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player, Category } from "@/lib/types";

interface PassAndPlayScreenProps {
  players: Player[];
  currentRevealIndex: number;
  isRoleVisible: boolean;
  selectedCategory: Category;
  secretWord: string;
  onReveal: () => void;
  onHideAndAdvance: () => void;
}

export default function PassAndPlayScreen({
  players,
  currentRevealIndex,
  isRoleVisible,
  selectedCategory,
  secretWord,
  onReveal,
  onHideAndAdvance,
}: PassAndPlayScreenProps) {
  const currentPlayer = players[currentRevealIndex];
  const isImpostor = currentPlayer.isImpostor;
  const progress = `${currentRevealIndex + 1} / ${players.length}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 no-select">
      {/* Progress indicator */}
      <div className="text-slate-400 text-sm mb-6">{progress}</div>

      <AnimatePresence mode="wait">
        {!isRoleVisible ? (
          // ---------- PASS PHONE PROMPT ----------
          <motion.div
            key="prompt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="text-2xl font-semibold">
              ហុចទូរស័ព្ទទៅឱ្យ
              <div className="text-4xl font-bold text-emerald-400 mt-2">
                {currentPlayer.name}
              </div>
            </div>

            <p className="text-slate-400 max-w-xs">
              សូមប្រាកដថាមានតែ {currentPlayer.name} ប៉ុណ្ណោះកំពុងមើលអេក្រង់
            </p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onReveal}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-5 px-8 rounded-2xl text-lg shadow-lg w-full max-w-xs"
            >
              ចុចដើម្បីមើលពាក្យសម្ងាត់
            </motion.button>
          </motion.div>
        ) : (
          // ---------- SECRET REVEAL CARD ----------
          <motion.div
            key="reveal"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            <div
              className={`w-full rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl border-2 ${
                isImpostor
                  ? "bg-gradient-to-br from-red-900 to-red-950 border-red-500"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500"
              }`}
            >
              <span className="text-sm uppercase tracking-wide text-slate-300">
                {selectedCategory.name_kh}
              </span>

              {isImpostor ? (
                <>
                  <div className="text-5xl">🕵️</div>
                  <div className="text-2xl font-bold text-red-300 text-center">
                    អ្នកគឺជា Impostor!
                  </div>
                  <p className="text-sm text-red-200/80 text-center">
                    ព្យាយាមស្តាប់ ហើយធ្វើពុតថាដឹងពាក្យសម្ងាត់
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl font-bold text-white text-center break-words">
                    {secretWord}
                  </div>
                  <p className="text-sm text-slate-400 text-center">
                    កុំនិយាយពាក្យនេះដោយផ្ទាល់!
                  </p>
                </>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onHideAndAdvance}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-2xl text-lg w-full"
            >
              {currentRevealIndex + 1 === players.length
                ? "បញ្ចប់ ➜ ចាប់ផ្តើមលេង"
                : "លាក់ ➜ អ្នកបន្ទាប់"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}