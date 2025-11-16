import React from 'react';
import type { CaseFile, Bonus } from '../types';
import { CheckCircleIcon, XCircleIcon, PlayIcon, SnowflakeIcon, PauseIcon } from './icons';
import useAudio from '../hooks/useAudio';

interface ResultScreenProps {
  caseFile: CaseFile;
  userGuess: string;
  isCorrect: boolean;
  onNext: () => void;
  bonus: Bonus;
  streakFreezeUsed: boolean;
  xpGained: number;
  level: number;
  xp: number;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ caseFile, userGuess, isCorrect, onNext, bonus, streakFreezeUsed, xpGained, level, xp }) => {
  const flawedAudio = useAudio(caseFile.flawedAudioUrl, true);
  const correctedAudio = useAudio(caseFile.correctedAudioUrl, true);

  const toggleAudio = (type: 'flawed' | 'corrected') => {
    if (type === 'flawed') {
      if (correctedAudio.isPlaying) {
        correctedAudio.pause();
      }
      flawedAudio.toggle();
    } else { // corrected
      if (flawedAudio.isPlaying) {
        flawedAudio.pause();
      }
      correctedAudio.toggle();
    }
  };

  const ResultIcon = isCorrect ? CheckCircleIcon : XCircleIcon;
  const xpForNextLevel = ((level) * (level) * 100);
  const xpForCurrentLevel = ((level - 1) * (level - 1) * 100);
  const xpProgress = Math.max(0, xp - xpForCurrentLevel);
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;

  return (
    <div className={`rounded-2xl p-6 shadow-2xl border ${isCorrect ? 'border-cyan-500/50' : 'border-purple-500/50'} animate-fade-in bg-slate-800/80 backdrop-blur-xl text-slate-200 ring-1 ring-white/10`}>
      <div className="text-center">
        <ResultIcon className={`w-16 h-16 mx-auto ${isCorrect ? 'text-cyan-400' : 'text-purple-400'} mb-2`} />
        <h2 className={`text-4xl font-black ${isCorrect ? 'text-cyan-300 neon-text-cyan' : 'text-purple-300 neon-text-purple'}`}>
          {isCorrect ? 'Correct!' : 'Not Quite!'}
        </h2>
        {isCorrect && (
          <p className="font-bold text-lg text-yellow-400 mt-2">
            +{xpGained} XP
          </p>
        )}
         {isCorrect && bonus && (
            <p className="font-bold text-base text-yellow-500 animate-pulse">
              Speed Bonus!
            </p>
        )}
        {!isCorrect && (
           <>
             <p className="text-lg text-slate-400 mt-2">The right answer was: <strong className="text-slate-100">{caseFile.correctAnswer}</strong></p>
             {streakFreezeUsed && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg flex items-center justify-center gap-2">
                    <SnowflakeIcon className="w-6 h-6 text-blue-400"/>
                    <p className="font-bold text-blue-300">Your Streak Freeze was used!</p>
                </div>
             )}
           </>
        )}
      </div>

       {isCorrect && (
        <div className="my-6">
            <div className="w-full bg-slate-700 rounded-full h-4 relative overflow-hidden border border-slate-600">
                 <div 
                    className="bg-gradient-to-r from-slate-900 to-slate-700 h-full" 
                    style={{ width: `${(xpProgress / xpNeeded) * 100}%` }}
                />
                <div 
                    className="absolute top-0 left-0 bg-gradient-to-r from-cyan-400 to-purple-500 h-full animate-progress"
                    style={{ width: `${Math.min(xpProgress + xpGained, xpNeeded) / xpNeeded * 100}%` }}
                />
            </div>
             <div className="text-xs font-bold text-slate-400 mt-1 text-right">LVL {level}</div>
        </div>
      )}

      <div className="bg-slate-900/50 p-4 rounded-lg my-6 text-center border border-slate-700">
        <h3 className="text-lg font-bold text-cyan-300 mb-2">Pro Tips</h3>
        <p className="text-slate-300">{caseFile.explanation}</p>
      </div>
      
      <div className="flex gap-4 my-6">
         <button onClick={() => toggleAudio('flawed')} className={`flex-1 p-3 bg-purple-500/10 border-2 border-purple-400/50 rounded-lg flex items-center justify-center gap-2 text-purple-300 font-bold hover:bg-purple-500/20 transition-colors`}>
            {flawedAudio.isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
            Flawed
        </button>
        <button onClick={() => toggleAudio('corrected')} className={`flex-1 p-3 bg-cyan-500/10 border-2 border-cyan-400/50 rounded-lg flex items-center justify-center gap-2 text-cyan-300 font-bold hover:bg-cyan-500/20 transition-colors`}>
            {correctedAudio.isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
            Corrected
        </button>
      </div>

      <button
        onClick={onNext}
        className={`w-full p-4 rounded-xl ${isCorrect ? 'bg-cyan-500 hover:bg-cyan-400 focus:ring-cyan-500/50' : 'bg-purple-600 hover:bg-purple-500 focus:ring-purple-500/50'} text-white font-black text-xl uppercase tracking-wider transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 shadow-lg`}
      >
        Continue
      </button>
    </div>
  );
};

export default ResultScreen;