import React from 'react';
import type { UserProgress } from '../types';
import { RANKS } from '../constants';
import { ArrowLeftIcon } from './icons';

interface ProfileScreenProps {
  userProgress: UserProgress;
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProgress, onBack }) => {
  const currentRank = RANKS.find(r => r.name === userProgress.rank) || RANKS[0];
  const nextRankIndex = RANKS.findIndex(r => r.name === currentRank.name) + 1;
  const nextRank = nextRankIndex < RANKS.length ? RANKS[nextRankIndex] : null;
  
  const accuracyPercentage = userProgress.accuracy.total > 0
    ? ((userProgress.accuracy.correct / userProgress.accuracy.total) * 100).toFixed(0)
    : '0';

  const progressToNextRank = nextRank
    ? Math.max(0, ((userProgress.xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100)
    : 100;

  const circumference = 2 * Math.PI * 55; // 2 * pi * radius

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700 animate-fade-in text-slate-200 ring-1 ring-white/10">
      <div className="flex items-center mb-6">
         <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors mr-4">
           <ArrowLeftIcon className="w-6 h-6 text-slate-300"/>
         </button>
         <h1 className="text-3xl font-black text-slate-100">Your Profile</h1>
      </div>
     
      <div className="bg-slate-900/50 rounded-xl p-6 text-center mb-6 border border-slate-700 flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="55" fill="none" stroke="#334155" strokeWidth="10" />
                <circle 
                    cx="60" cy="60" r="55" fill="none" 
                    stroke="url(#progressGradient)" 
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progressToNextRank / 100) * circumference}
                    className="transition-all duration-1000 ease-out"
                    transform="rotate(-90 60 60)"
                />
                <defs>
                    <linearGradient id="progressGradient">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                 <currentRank.icon className="w-16 h-16 text-cyan-300"/>
            </div>
        </div>

        <div>
            <h2 className="text-4xl font-black text-slate-100">{currentRank.name}</h2>
            <p className="text-slate-400">Level {userProgress.level}</p>
            {nextRank ? (
              <p className="text-purple-400">{nextRank.minXP - userProgress.xp} XP to {nextRank.name}</p>
            ) : (
              <p className="text-yellow-400 font-bold">You've reached the highest rank!</p>
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
          <p className="text-sm font-bold text-slate-400 uppercase">Current Streak</p>
          <p className="text-3xl font-black text-yellow-400">{userProgress.streak}</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
          <p className="text-sm font-bold text-slate-400 uppercase">Total XP</p>
          <p className="text-3xl font-black text-slate-200">{userProgress.xp}</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
          <p className="text-sm font-bold text-slate-400 uppercase">Cases Solved</p>
          <p className="text-3xl font-black text-slate-200">{userProgress.solvedCases.size}</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
          <p className="text-sm font-bold text-slate-400 uppercase">Accuracy</p>
          <p className="text-3xl font-black text-slate-200">{accuracyPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;