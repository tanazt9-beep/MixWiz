import React, { useState } from 'react';
import type { CaseFile, Genre } from '../types';
import { BatMascotIcon } from './icons';
import { GENRES, genreThemes } from '../constants';

interface ChallengeSelectScreenProps {
  onSelectChallenge: (genre: Genre, difficulty: CaseFile['category']) => void;
}

const difficulties: {level: CaseFile['category'], colors: string, description: string}[] = [
    { level: 'Beginner', colors: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20', description: 'Learn the fundamentals.' },
    { level: 'Intermediate', colors: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20', description: 'Hone your core skills.' },
    { level: 'Expert', colors: 'border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20', description: 'True challenge.' },
];

const ChallengeSelectScreen: React.FC<ChallengeSelectScreenProps> = ({ onSelectChallenge }) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  if (!selectedGenre) {
    return (
       <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700 animate-fade-in ring-1 ring-white/10">
        <div className="text-center mb-8">
            <BatMascotIcon className="w-28 h-28 mx-auto text-slate-400 mb-2"/>
            <h1 className="text-4xl font-black text-slate-100">Welcome to MixWiz</h1>
            <p className="text-slate-400 mt-1">First, select a genre to train in.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GENRES.map(genre => (
                <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${genreThemes[genre].gradient.replace('/80', '')} text-white font-black uppercase tracking-wider text-2xl transform transition-transform hover:scale-105 shadow-lg`}
                >
                    {genre}
                </button>
            ))}
        </div>
       </div>
    );
  }

  const selectedGenreTheme = genreThemes[selectedGenre];

  return (
    <div className={`bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border ${selectedGenreTheme.border} animate-fade-in ring-1 ring-white/10`}>
        <div className="text-center mb-8 relative">
           <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-transparent to-slate-900">
             <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${selectedGenreTheme.gradient}`} />
           </div>
            <div className={`text-center mb-2 inline-block p-2 px-4 rounded-lg bg-gradient-to-br ${selectedGenreTheme.gradient.replace('/80', '')}`}>
                 <h1 className="text-3xl font-black text-white">{selectedGenre}</h1>
            </div>
            <p className="text-slate-400 mt-1">Now, select your difficulty.</p>
             <button onClick={() => setSelectedGenre(null)} className="text-sm text-cyan-400 hover:underline mt-2">Change Genre</button>
        </div>

        <div className="space-y-4">
        {difficulties.map(({ level, colors, description }) => (
            <button
            key={level}
            onClick={() => onSelectChallenge(selectedGenre, level)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 transform hover:-translate-y-1 ${colors}`}
            >
            <h2 className="text-2xl font-black uppercase tracking-wider">{level}</h2>
            <p className="font-normal opacity-80">{description}</p>
            </button>
        ))}
        </div>
    </div>
  );
};

export default ChallengeSelectScreen;
