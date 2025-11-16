import React from 'react';

export type Screen = 'game' | 'result' | 'profile' | 'difficulty';

export type Genre = 'Hip-Hop' | 'Electronic' | 'Rock' | 'Pop';

export interface CaseFile {
  id: string;
  title: string;
  genre: Genre;
  category: 'Beginner' | 'Intermediate' | 'Expert';
  flawedAudioUrl: string;
  correctedAudioUrl: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Rank {
  name: string;
  minXP: number;
  icon: React.FC<{className?: string}>;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  solvedCases: Set<string>;
  rank: string;
  accuracy: {
    correct: number;
    total: number;
  };
  streakFreezes: number;
}

export type Bonus = { type: 'speed'; amount: number } | null;