import React from 'react';
import { UserIcon, StarIcon, HomeIcon, SnowflakeIcon } from './icons';

interface HeaderProps {
  streak: number;
  streakFreezes: number;
  xp: number;
  level: number;
  onProfileClick: () => void;
  onHomeClick: () => void;
  showHomeButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ streak, streakFreezes, xp, level, onProfileClick, onHomeClick, showHomeButton }) => {
  return (
    <header className="flex justify-between items-center p-2 sm:p-3 bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 sticky top-4 z-10 ring-1 ring-white/10">
      <div className="flex items-center gap-2">
        {showHomeButton && (
          <button 
            onClick={onHomeClick} 
            className="p-3 rounded-full hover:bg-slate-700 transition-colors"
            aria-label="Go to home"
          >
            <HomeIcon className="w-6 h-6 text-slate-300" />
          </button>
        )}
         <div className="flex items-center gap-2">
             <div className="flex items-center gap-2 bg-slate-700/50 p-2 rounded-lg border border-slate-600" title={`${streak} day streak`}>
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-lg text-yellow-300">{streak}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-700/50 p-2 rounded-lg border border-slate-600" title={`${streakFreezes} streak freeze(s) available`}>
              <SnowflakeIcon className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-lg text-blue-300">{streakFreezes}</span>
            </div>
         </div>
      </div>
      
      <div className="flex items-center gap-3">
         <div className="flex items-center gap-2 text-right">
            <div className="hidden sm:block">
                <span className="font-bold text-slate-200">{xp} XP</span>
                <span className="text-xs text-slate-400"> / LVL {level}</span>
            </div>
         </div>
        <button 
          onClick={onProfileClick} 
          className="p-3 rounded-full hover:bg-slate-700 transition-colors"
          aria-label="View Profile"
        >
          <UserIcon className="w-6 h-6 text-slate-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;