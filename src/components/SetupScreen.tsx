"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import wordData from "@/data/words";
import { saveLastNames, loadLastNames } from "@/lib/storage";

interface SetupScreenProps {
  onStart: (config: {
    playerNames: string[];
    categoryId: string;
    timerDuration: number;
  }) => void;
}

export default function SetupScreen({ onStart }: SetupScreenProps) {
  const [playerCount, setPlayerCount] = useState(4);
  const [categoryId, setCategoryId] = useState<string>("random");
  const [timerDuration, setTimerDuration] = useState(60);
  const [customNames, setCustomNames] = useState<string[]>([]);
  const [useCustomNames, setUseCustomNames] = useState(false);

  // Load previously used names on first mount
  useEffect(() => {
    const saved = loadLastNames();
    if (saved && saved.length > 0) {
      setCustomNames(saved);
      setUseCustomNames(true);
      // If more names were saved than the default player count, expand to fit
      if (saved.length > playerCount) {
        setPlayerCount(Math.min(saved.length, 10));
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleNameChange(index: number, value: string) {
    const updated = [...customNames];
    updated[index] = value;
    setCustomNames(updated);
  }

  function handleStart() {
    const names = Array.from({ length: playerCount }, (_, i) =>
      useCustomNames && customNames[i]?.trim()
        ? customNames[i].trim()
        : `អ្នកលេង ${i + 1}`
    );

    // Persist only if the player actually used custom names
    if (useCustomNames) {
      saveLastNames(names);
    }

    onStart({ playerNames: names, categoryId, timerDuration });
  }

  // ... rest of the component (JSX) stays exactly the same

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 p-6 max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold text-center mb-2">
        🕵️ ហ្គេម Impostor
      </h1>

      {/* Player Count */}
      <section>
        <label className="block mb-2 text-lg font-medium">
          ចំនួនអ្នកលេង: <span className="text-emerald-400">{playerCount}</span>
        </label>
        <input
          type="range"
          min={3}
          max={10}
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
        <div className="flex justify-between text-sm text-slate-400 mt-1">
          <span>3</span>
          <span>10</span>
        </div>
      </section>

      {/* Category Selection */}
      <section>
        <label className="block mb-2 text-lg font-medium">ប្រភេទ</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCategoryId("random")}
            className={`p-3 rounded-xl border text-sm transition-colors ${
              categoryId === "random"
                ? "bg-emerald-500 border-emerald-400 text-white"
                : "bg-slate-800 border-slate-600 text-slate-300"
            }`}
          >
            🎲 ចៃដន្យ
          </button>
          {wordData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryId(cat.id)}
              className={`p-3 rounded-xl border text-sm transition-colors ${
                categoryId === cat.id
                  ? "bg-emerald-500 border-emerald-400 text-white"
                  : "bg-slate-800 border-slate-600 text-slate-300"
              }`}
            >
              {cat.name_kh}
            </button>
          ))}
        </div>
      </section>

      {/* Timer Duration */}
      <section>
        <label className="block mb-2 text-lg font-medium">
          រយៈពេលពិភាក្សា: <span className="text-emerald-400">{timerDuration}s</span>
        </label>
        <input
          type="range"
          min={30}
          max={180}
          step={15}
          value={timerDuration}
          onChange={(e) => setTimerDuration(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </section>

      {/* Optional Custom Names */}
      <section>
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useCustomNames}
            onChange={(e) => setUseCustomNames(e.target.checked)}
            className="accent-emerald-500 w-4 h-4"
          />
          <span className="text-lg font-medium">កំណត់ឈ្មោះអ្នកលេង (ស្រេចចិត្ត)</span>
        </label>

        {useCustomNames && (
          <div className="flex flex-col gap-2 mt-2">
            {Array.from({ length: playerCount }, (_, i) => (
              <input
                key={i}
                type="text"
                placeholder={`អ្នកលេង ${i + 1}`}
                value={customNames[i] || ""}
                onChange={(e) => handleNameChange(i, e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
              />
            ))}
          </div>
        )}
      </section>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl text-lg shadow-lg"
      >
        ចាប់ផ្តើមហ្គេម
      </motion.button>
    </motion.div>
  );
}