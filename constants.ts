import type { CaseFile, Rank, Genre } from './types';
import { EarIcon, FaderIcon, MagnifyingGlassIcon, TrophyIcon, StarIcon, RookieIcon } from './components/icons';

export const GENRES: Genre[] = ['Hip-Hop', 'Electronic', 'Rock', 'Pop'];

export const CASE_FILES: CaseFile[] = [
  {
    id: 'case-001',
    title: 'Muddy Kick Drum',
    genre: 'Hip-Hop',
    category: 'Beginner',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-001-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-001-corrected.mp3',
    options: ['Too Bright', 'Muddy Low-End', 'Too Much Reverb', 'Panning is Off'],
    correctAnswer: 'Muddy Low-End',
    explanation: 'The kick drum had too much energy around 200-400Hz, making it sound "muddy" and unclear. A small EQ cut in this range cleans it up significantly.'
  },
  {
    id: 'case-002',
    title: 'Harsh Vocals',
    genre: 'Pop',
    category: 'Beginner',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-002-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-002-corrected.mp3',
    options: ['Boxy Mids', 'Too Quiet', 'Harsh Highs', 'Delay is Wrong'],
    correctAnswer: 'Harsh Highs',
    explanation: 'The vocal had a sharp peak around 4-6kHz, causing a harsh "ess" sound (sibilance). A de-esser or a precise EQ cut tames this harshness.'
  },
   {
    id: 'case-003',
    title: 'Boxy Snare Drum',
    genre: 'Rock',
    category: 'Beginner',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-003-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-003-corrected.mp3',
    options: ['Too much low-end', 'Boxy Mids', 'Too much reverb', 'Too quiet'],
    correctAnswer: 'Boxy Mids',
    explanation: 'The snare had a resonant frequency in the 400-600Hz range, giving it a cardboard "boxy" sound. An EQ cut in this area lets the true "crack" of the snare come through.'
  },
  {
    id: 'case-006',
    title: 'Drowned in Reverb',
    genre: 'Electronic',
    category: 'Beginner',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-006-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-006-corrected.mp3',
    options: ['Too Dry', 'Too Much Reverb', 'Too Much Delay', 'Vocals Too Loud'],
    correctAnswer: 'Too Much Reverb',
    explanation: 'The synth lead was sent to a reverb with the wet/dry mix set too high, pushing it to the back of the mix and making it sound distant and washed out.'
  },
  {
    id: 'case-007',
    title: 'Buried Lead Synth',
    genre: 'Electronic',
    category: 'Beginner',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-007-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-007-corrected.mp3',
    options: ['Synth Too Loud', 'Level Balance Issue', 'Pads Too Quiet', 'Drums Too Loud'],
    correctAnswer: 'Level Balance Issue',
    explanation: 'This is a classic level balance problem. The lead synth was too quiet compared to the drums and bass, getting lost in the mix. Simply raising the synth fader makes it sit perfectly on top.'
  },
  {
    id: 'case-004',
    title: 'Overcompressed Master',
    genre: 'Electronic',
    category: 'Intermediate',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-004-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-004-corrected.mp3',
    options: ['Compression Pumping', 'Not Loud Enough', 'Stereo Field Too Wide', 'Too much bass'],
    correctAnswer: 'Compression Pumping',
    explanation: 'The master bus compressor had a fast attack and high ratio, causing an audible "pumping" effect that killed the track\'s dynamics. A slower attack and lower ratio fixed it.'
  },
  {
    id: 'case-008',
    title: 'Untamed Transients',
    genre: 'Hip-Hop',
    category: 'Intermediate',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-008-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-008-corrected.mp3',
    options: ['Snare is too dull', 'Harsh Cymbals', 'Snare is Too \'Pokey\'', 'Kick is too boomy'],
    correctAnswer: 'Snare is Too \'Pokey\'',
    explanation: 'The snare drum\'s initial hit (the transient) was too sharp and aggressive, making it poke out of the mix unpleasantly. A transient shaper was used to soften the attack, helping it blend in more naturally.'
  },
  {
    id: 'case-009',
    title: 'Clashing Frequencies',
    genre: 'Hip-Hop',
    category: 'Intermediate',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-009-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-009-corrected.mp3',
    options: ['Bass is too quiet', 'Kick is too loud', 'Frequency Masking', 'Phase Issues'],
    correctAnswer: 'Frequency Masking',
    explanation: 'The kick drum and the bass were competing for the same low-frequency range (around 80-120Hz), causing muddiness. A small EQ cut on the bass in the kick\'s primary frequency created space for both.'
  },
  {
    id: 'case-011',
    title: 'Out-of-Time Delay',
    genre: 'Rock',
    category: 'Intermediate',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-011-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-011-corrected.mp3',
    options: ['Reverb is too long', 'Delay Not Synced', 'Guitars are harsh', 'Too much feedback'],
    correctAnswer: 'Delay Not Synced',
    explanation: 'The delay on the guitar was set to a value that didn\'t match the song\'s tempo, creating a chaotic feel. Syncing the delay to a 1/4 note subdivision locked it into the groove.'
  },
  {
    id: 'case-005',
    title: 'Phasey Guitars',
    genre: 'Rock',
    category: 'Expert',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-005-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-005-corrected.mp3',
    options: ['Guitars are too loud', 'Wrong delay time', 'Phase Cancellation', 'Not enough distortion'],
    correctAnswer: 'Phase Cancellation',
    explanation: 'Two guitar tracks recorded with multiple mics were slightly out of phase, causing frequencies to cancel out and sound thin. A phase alignment tool resolved the issue.'
  },
  {
    id: 'case-010',
    title: 'Narrow Stereo Image',
    genre: 'Electronic',
    category: 'Expert',
    flawedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-010-flawed.mp3',
    correctedAudioUrl: 'https://storage.googleapis.com/gemini-web-codelab-audio/mixwiz/case-010-corrected.mp3',
    options: ['Mono Compatibility Issue', 'Too much reverb', 'Stereo Field Too Narrow', 'Panning is wrong'],
    correctAnswer: 'Stereo Field Too Narrow',
    explanation: 'The overall stereo image was very narrow, lacking width. A stereo imaging plugin was used on the master bus to gently widen the side channels, creating a more immersive sound.'
  }
];

export const RANKS: Rank[] = [
  { name: 'Sonic Scout', minXP: 0, icon: EarIcon },
  { name: 'Audio Rookie', minXP: 500, icon: RookieIcon },
  { name: 'Beat Detective', minXP: 1500, icon: MagnifyingGlassIcon },
  { name: 'Audio Adept', minXP: 3000, icon: FaderIcon },
  { name: 'Mix Master', minXP: 5000, icon: StarIcon },
  { name: 'MixWiz', minXP: 10000, icon: TrophyIcon }
];

export const GAME_CONFIG = {
  SPEED_BONUS_THRESHOLD_SECONDS: 5,
  SPEED_BONUS_POINTS: 50,
  INITIAL_STREAK_FREEZES: 1,
};

export const genreThemes: Record<Genre, { gradient: string; border: string }> = {
    'Hip-Hop': { gradient: 'from-orange-500/80 to-red-600/80', border: 'border-orange-500/50' },
    'Electronic': { gradient: 'from-purple-500/80 to-indigo-600/80', border: 'border-purple-500/50' },
    'Rock': { gradient: 'from-rose-500/80 to-pink-600/80', border: 'border-rose-500/50' },
    'Pop': { gradient: 'from-teal-400/80 to-cyan-600/80', border: 'border-teal-500/50' }
};
