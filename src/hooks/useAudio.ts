import { useEffect, useRef, useCallback } from "react";

import buttonSrc from "../assets/audio/button.mp3";
import flipSrc from "../assets/audio/flip.mp3";
import loseSrc from "../assets/audio/lose.mp3";
import victorySrc from "../assets/audio/victory.mp3";
import levelupSrc from "../assets/audio/levelup.mp3";
import startupSrc from "../assets/audio/startup.mp3";

export function useAudio() {
  const buttonRef = useRef<HTMLAudioElement | null>(null);
  const flipRef = useRef<HTMLAudioElement | null>(null);
  const loseRef = useRef<HTMLAudioElement | null>(null);
  const victoryRef = useRef<HTMLAudioElement | null>(null);
  const levelupRef = useRef<HTMLAudioElement | null>(null);
  const startupRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    buttonRef.current = new Audio(buttonSrc);
    buttonRef.current.volume = 0.3;

    flipRef.current = new Audio(flipSrc);
    flipRef.current.volume = 0.5;

    loseRef.current = new Audio(loseSrc);
    loseRef.current.volume = 0.6;

    victoryRef.current = new Audio(victorySrc);
    victoryRef.current.volume = 0.6;

    levelupRef.current = new Audio(levelupSrc);
    levelupRef.current.volume = 0.5;

    startupRef.current = new Audio(startupSrc);
    startupRef.current.volume = 0.5;
  }, []);

  const playSound = useCallback((ref: React.RefObject<HTMLAudioElement | null>) => {
    if (!ref.current) return;
    ref.current.currentTime = 0;
    ref.current.play().catch(() => {});
  }, []);

  return {
    playButton: () => playSound(buttonRef),
    playFlip: () => playSound(flipRef),
    playLose: () => playSound(loseRef),
    playVictory: () => playSound(victoryRef),
    playLevelup: () => playSound(levelupRef),
    playStartup: () => playSound(startupRef),
    stopEndGameSounds: () => {
      if (loseRef.current) { loseRef.current.pause(); loseRef.current.currentTime = 0; }
      if (victoryRef.current) { victoryRef.current.pause(); victoryRef.current.currentTime = 0; }
    },
  };
}