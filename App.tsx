import React, { useState, useCallback, useMemo } from 'react';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import ProfileScreen from './components/ProfileScreen';
import ChallengeSelectScreen from './components/ChallengeSelectScreen';
import Header from './components/Header';
import { CASE_FILES, RANKS, GAME_CONFIG } from './constants';
import type { CaseFile, UserProgress, Screen, Bonus } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('difficulty');
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<CaseFile['category'] | null>(null);
  const [genre, setGenre] = useState<CaseFile['genre'] | null>(null);
  const [lastBonus, setLastBonus] = useState<Bonus>(null);
  const [streakFreezeWasUsed, setStreakFreezeWasUsed] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const [userProgress, setUserProgress] = useState<UserProgress>({
    xp: 0,
    level: 1,
    streak: 0,
    solvedCases: new Set(),
    rank: RANKS[0].name,
    accuracy: { correct: 0, total: 0 },
    streakFreezes: GAME_CONFIG.INITIAL_STREAK_FREEZES,
  });
  
  const filteredCases = useMemo(() => {
    if (!difficulty || !genre) return [];
    return CASE_FILES.filter(c => c.category === difficulty && c.genre === genre);
  }, [difficulty, genre]);

  const currentCase = useMemo(() => {
    if (filteredCases.length === 0) return null;
    return filteredCases[currentCaseIndex % filteredCases.length];
  }, [currentCaseIndex, filteredCases]);

  const isCorrect = userGuess !== null && currentCase !== null && userGuess === currentCase.correctAnswer;

  const handleGuess = useCallback((guess: string, timeTaken: number) => {
    if (!currentCase) return;

    setUserGuess(guess);
    const correct = guess === currentCase.correctAnswer;
    
    const bonus: Bonus = correct && timeTaken < GAME_CONFIG.SPEED_BONUS_THRESHOLD_SECONDS
      ? { type: 'speed', amount: GAME_CONFIG.SPEED_BONUS_POINTS }
      : null;
    
    setLastBonus(bonus);
    setStreakFreezeWasUsed(false);

    setUserProgress(prev => {
      const newSolvedCases = new Set(prev.solvedCases);
      if (correct) {
        newSolvedCases.add(currentCase.id);
      }
      
      let newStreak = prev.streak;
      let newStreakFreezes = prev.streakFreezes;
      
      if (correct) {
        newStreak += 1;
      } else {
        if (prev.streak > 0 && prev.streakFreezes > 0) {
          newStreakFreezes -= 1;
          setStreakFreezeWasUsed(true);
        } else {
          newStreak = 0;
        }
      }

      const bonusPoints = bonus ? bonus.amount : 0;
      const basePoints = 100;
      const streakPoints = newStreak * 10;
      const pointsGained = correct ? basePoints + streakPoints + bonusPoints : 0;
      setXpGained(pointsGained);

      const newXp = prev.xp + pointsGained;
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

      const newAccuracy = {
        correct: prev.accuracy.correct + (correct ? 1 : 0),
        total: prev.accuracy.total + 1,
      };

      const newRank = RANKS.slice().reverse().find(r => newXp >= r.minXP)?.name || prev.rank;

      return {
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        solvedCases: newSolvedCases,
        rank: newRank,
        accuracy: newAccuracy,
        streakFreezes: newStreakFreezes,
      };
    });

    setCurrentScreen('result');
  }, [currentCase]);

  const handleNext = useCallback(() => {
    setCurrentCaseIndex(prev => prev + 1);
    setUserGuess(null);
    setLastBonus(null);
    setXpGained(0);
    setStreakFreezeWasUsed(false);
    setCurrentScreen('game');
  }, []);

  const handleSelectChallenge = useCallback((selectedGenre: CaseFile['genre'], selectedDifficulty: CaseFile['category']) => {
    setGenre(selectedGenre);
    setDifficulty(selectedDifficulty);
    setCurrentCaseIndex(0);
    setUserGuess(null);
    setCurrentScreen('game');
  }, []);

  const navigateToProfile = useCallback(() => {
    setCurrentScreen('profile');
  }, []);

  const navigateToGame = useCallback(() => {
    if(difficulty && genre) {
      setCurrentScreen('game');
    } else {
      setCurrentScreen('difficulty');
    }
  }, [difficulty, genre]);

  const navigateToDifficulty = useCallback(() => {
    setCurrentScreen('difficulty');
  }, []);

  const renderScreen = () => {
    if (!currentCase && currentScreen === 'game') {
        setCurrentScreen('difficulty');
        return <p className="text-center text-red-400">No cases found for this combination. Please select another.</p>;
    }

    switch (currentScreen) {
      case 'difficulty':
        return <ChallengeSelectScreen onSelectChallenge={handleSelectChallenge} />;
      case 'game':
        return <GameScreen key={currentCase!.id} caseFile={currentCase!} onGuess={handleGuess} />;
      case 'result':
        if (userGuess === null) {
            setCurrentScreen('game');
            return null;
        }
        return (
          <ResultScreen
            caseFile={currentCase!}
            userGuess={userGuess}
            isCorrect={isCorrect}
            onNext={handleNext}
            bonus={lastBonus}
            streakFreezeUsed={streakFreezeWasUsed}
            xpGained={xpGained}
            level={userProgress.level}
            xp={userProgress.xp}
          />
        );
      case 'profile':
        return <ProfileScreen userProgress={userProgress} onBack={navigateToGame} />;
      default:
        return <ChallengeSelectScreen onSelectChallenge={handleSelectChallenge} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-poppins flex flex-col items-center p-4 selection:bg-purple-500 selection:text-white">
      <div className="w-full max-w-md mx-auto">
        <Header 
          streak={userProgress.streak} 
          streakFreezes={userProgress.streakFreezes}
          xp={userProgress.xp} 
          level={userProgress.level}
          onProfileClick={navigateToProfile}
          onHomeClick={navigateToDifficulty}
          showHomeButton={currentScreen !== 'difficulty'}
        />
        <main className="mt-4">
          {renderScreen()}
        </main>
      </div>
       <footer className="w-full max-w-md mx-auto text-center py-4 mt-auto">
        <p className="text-xs text-slate-600">Echo by MixWiz - Train Your Ears</p>
      </footer>
    </div>
  );
};

export default App;