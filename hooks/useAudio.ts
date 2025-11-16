import { useState, useEffect, useRef, useCallback } from 'react';

const useAudio = (url: string, loop: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect to handle creation, setup, and cleanup of the Audio object
  useEffect(() => {
    // This code only runs in the browser
    if (typeof Audio === 'undefined') {
      return;
    }

    // Create a new Audio instance when the URL changes.
    const audio = new Audio(url);
    audio.loop = loop;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause); // When audio finishes, it's not "playing".

    // Cleanup function: runs when component unmounts or dependencies change.
    return () => {
      if (audio) {
        audio.pause();
        // Remove listeners to prevent memory leaks and attempting to set state on unmounted components.
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handlePause);
      }
      // NOTE: We don't nullify audioRef.current here. This avoids race conditions
      // in React's StrictMode where the ref could become null between cleanup and the next effect run.
      // The ref will be correctly updated with a new audio instance when the effect re-runs.
    };
  }, [url, loop]); // Re-run this effect if the audio URL or loop status changes.

  const toggle = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // play() returns a promise. It's good practice to catch potential errors.
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  }, [isPlaying]);
  
  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
        audioRef.current.pause();
    }
  }, [isPlaying]);

  return { isPlaying, toggle, play, pause };
};

export default useAudio;
