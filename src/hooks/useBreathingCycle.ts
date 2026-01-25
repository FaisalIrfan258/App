import { useState, useEffect, useRef } from 'react';

export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

interface BreathingCycle {
  phase: BreathingPhase;
  progress: number; // 0-1
  countdown: number; // seconds remaining in current phase
  cycleCount: number;
}

// 4-7-8 Breathing Technique
const PHASE_DURATIONS: Record<BreathingPhase, number> = {
  inhale: 4,
  hold: 7,
  exhale: 8,
  pause: 2,
};

const PHASE_ORDER: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'pause'];

export const useBreathingCycle = () => {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(PHASE_DURATIONS.inhale);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const startTimeRef = useRef<number>(Date.now());
  const phaseStartRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsedInPhase = (now - phaseStartRef.current) / 1000;
      const phaseDuration = PHASE_DURATIONS[phase];

      if (elapsedInPhase >= phaseDuration) {
        // Move to next phase
        const currentIndex = PHASE_ORDER.indexOf(phase);
        const nextIndex = (currentIndex + 1) % PHASE_ORDER.length;
        const nextPhase = PHASE_ORDER[nextIndex];

        // Increment cycle count when completing a full cycle
        if (nextPhase === 'inhale') {
          setCycleCount((prev) => prev + 1);
        }

        setPhase(nextPhase);
        setProgress(0);
        setCountdown(PHASE_DURATIONS[nextPhase]);
        phaseStartRef.current = now;
      } else {
        // Update progress within current phase
        const newProgress = elapsedInPhase / phaseDuration;
        const newCountdown = Math.ceil(phaseDuration - elapsedInPhase);
        setProgress(newProgress);
        setCountdown(newCountdown);
      }
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(intervalId);
  }, [phase, isActive]);

  const reset = () => {
    setPhase('inhale');
    setProgress(0);
    setCountdown(PHASE_DURATIONS.inhale);
    setCycleCount(0);
    startTimeRef.current = Date.now();
    phaseStartRef.current = Date.now();
  };

  const pause = () => setIsActive(false);
  const resume = () => {
    setIsActive(true);
    phaseStartRef.current = Date.now();
  };

  return {
    phase,
    progress,
    countdown,
    cycleCount,
    isActive,
    reset,
    pause,
    resume,
  };
};
