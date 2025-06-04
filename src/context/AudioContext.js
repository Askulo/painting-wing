// AudioContext.js
"use client";
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    // Use window to store the audio instance globally
    if (typeof window !== 'undefined') {
      if (!window.globalAudio) {
        window.globalAudio = new Audio("/ambient-music-329699.mp3");
        window.globalAudio.loop = true;
        
        // Add error handling for the audio element
        window.globalAudio.onerror = (e) => {
          console.error('Audio error:', e);
          setIsPlaying(false);
        };

        // Handle ended event (although it shouldn't occur with loop=true)
        window.globalAudio.onended = () => {
          if (isPlaying) {
            window.globalAudio.play().catch(console.error);
          }
        };
      }
      audioRef.current = window.globalAudio;

      // Load saved state
      const savedMusicState = sessionStorage.getItem('background_music_state');
      if (savedMusicState === 'playing') {
        setIsPlaying(true);
        // Use Promise to handle autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playback resumed successfully');
            })
            .catch(e => {
              console.log('Auto-play prevented:', e);
              setIsPlaying(false);
              sessionStorage.setItem('background_music_state', 'paused');
            });
        }
      }
    }

    // Add visibility change listener to handle tab switching
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        audioRef.current?.pause();
        sessionStorage.setItem('background_music_state', 'paused');
        setIsPlaying(false);
      } else if (document.visibilityState === 'visible' && isPlaying) {
        audioRef.current?.play();
        sessionStorage.setItem('background_music_state', 'playing');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup visibility change listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Don't cleanup audio on component unmount to persist across routes
    };
  }, [isPlaying]);
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      sessionStorage.setItem('background_music_state', 'paused');
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            sessionStorage.setItem('background_music_state', 'playing');
            setIsPlaying(true);
          })
          .catch(e => {
            console.error('Playback failed:', e);
            setIsPlaying(false);
            sessionStorage.setItem('background_music_state', 'paused');
          });
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}