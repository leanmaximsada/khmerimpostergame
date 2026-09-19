"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Player, Category } from "@/lib/types";

interface GameplayScreenProps {
  players: Player[];
  startingPlayerId: number | null;
  selectedCategory: Category;
  timerDuration: number;
  onReset: () => void;
}

export default function GameplayScreen({
  players,
  startingPlayerId,
  selectedCategory,
  timerDuration,
  onReset,
}: GameplayScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(timerDuration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startingPlayer = players.find((p) => p.id === startingPlayerId);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft]);

  function toggleTimer() {
    setIsRunning((r) => !r);
  }

  function restartTimer() {
    setIsRunning(false);
    setSecondsLeft(timerDuration);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const isTimeUp = secondsLeft === 0;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 gap-6">
      {/* Category summary */}
      <div className="text-center">
        <span className="text-slate-400 text-sm">ប្រភេទថ្ងៃនេះ</span>
        <div className="text-xl font-bold text-emerald-400">
          {selectedCategory.name_kh}
        </div>
      </div>

      {/* Starting player */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 border border-emerald-500 rounded-2xl px-6 py-4 text-center"
      >
        <div className="text-sm text-slate-400">អ្នកចាប់ផ្តើមផ្តល់គន្លឹះមុនគេ</div>
        <div className="text-2xl font-bold mt-1">🎤 {startingPlayer?.name}</div>
      </motion.div>

      {/* Timer */}
      <motion.div
        animate={isTimeUp ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: isTimeUp ? Infinity : 0, duration: 0.8 }}
        className={`text-7xl font-bold tabular-nums my-4 ${
          isTimeUp ? "text-red-500" : "text-white"
        }`}
      >
        {timeDisplay}
      </motion.div>

      <div className="flex gap-3 w-full max-w-xs">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          disabled={isTimeUp}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-bold py-3 rounded-xl"
        >
          {isRunning ? "⏸ ផ្អាក" : "▶ ចាប់ផ្តើម"}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={restartTimer}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl"
        >
          🔄 កំណត់ម្តងទៀត
        </motion.button>
      </div>

      {/* Rules reminder */}
      <div className="bg-slate-800/60 rounded-2xl p-5 text-sm text-slate-300 w-full max-w-md mt-4 leading-relaxed">
        <div className="font-bold text-white mb-2">📜 ក្បួនលេង</div>
        <ul className="list-disc list-inside space-y-1">
          <li>អ្នកលេងម្នាក់ៗនិយាយពាក្យគន្លឹះទាក់ទងនឹងពាក្យសម្ងាត់ម្តងមួយៗ</li>
          <li>Impostor មិនដឹងពាក្យសម្ងាត់ទេ ត្រូវព្យាយាមទាយ ឬបន្លំ</li>
          <li>ក្រោយពេលវេលាអស់ អ្នកលេងទាំងអស់បោះឆ្នោតថាអ្នកណាជា Impostor</li>
          <li>បើទាយត្រូវ Impostor ចាញ់! បើទាយខុស Impostor ឈ្នះ!</li>
        </ul>
      </div>

      {/* Reset / New game */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mt-2 text-slate-400 underline text-sm"
      >
        ចាប់ផ្តើមហ្គេមថ្មី
      </motion.button>
    </div>
  );
}