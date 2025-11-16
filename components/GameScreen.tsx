import React, { useState, useRef } from 'react';
import type { CaseFile } from '../types';
import { PlayIcon, PauseIcon } from './icons';
import useAudio from '../hooks/useAudio';

interface GameScreenProps {
  caseFile: CaseFile;
  onGuess: (guess: string, timeTaken: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ caseFile, onGuess }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { isPlaying, toggle } = useAudio(caseFile.flawedAudioUrl, true);
  const startTimeRef = useRef<number>(Date.now());

  const handleSubmit = () => {
    if (selectedOption) {
      const timeTaken = (Date.now() - startTimeRef.current) / 1000;
      onGuess(selectedOption, timeTaken);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700 animate-fade-in ring-1 ring-white/10">
      <div className="text-center mb-6">
        <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest neon-text-cyan">{caseFile.genre} / {caseFile.category}</p>
        <h1 className="text-3xl font-black text-slate-100 mt-1">What's the issue?</h1>
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-2xl
            ${isPlaying ? 'bg-purple-600 scale-105 neon-glow-purple' : 'bg-cyan-500 hover:bg-cyan-400 neon-glow-cyan'}`}
        >
          {isPlaying ? <PauseIcon className="w-14 h-14 text-white" /> : <PlayIcon className="w-14 h-14 text-white pl-1" />}
        </button>
      </div>

      <div className="space-y-3">
        {caseFile.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-lg font-bold
              ${selectedOption === option
                ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg scale-105 ring-2 ring-white/20'
                : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="w-full mt-8 p-4 rounded-xl bg-purple-600 text-white font-black text-xl uppercase tracking-wider transition-all duration-300 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed hover:enabled:bg-purple-500 hover:enabled:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg disabled:shadow-none"
      >
        Submit
      </button>
    </div>
  );
};

export default GameScreen;