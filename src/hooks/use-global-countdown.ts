import { useEffect, useRef } from "react";
import { create } from "zustand";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// A local zustand, to keep track of the shared timer across the app.
type SecondsStore = {
  remainingSeconds: number;
  setRemainingSeconds: (newSeconds: number) => void;
  intervalId: NodeJS.Timeout | null;
  setIntervalId: (id: NodeJS.Timeout | null) => void;
};
const useSecondsStore = create<SecondsStore>((set) => ({
  remainingSeconds: 0,
  setRemainingSeconds: (newSeconds) => set({ remainingSeconds: newSeconds }),
  intervalId: null,
  setIntervalId: (newId) =>
    set((state) => {
      if (state.intervalId) clearInterval(state.intervalId); // Clear old ID
      return { intervalId: newId }; // return the new one
    }),
}));

// The actual hook
export function useGlobalCountdown() {
  const { remainingSeconds, setRemainingSeconds, setIntervalId } = useSecondsStore();

  // Use a ref to hold the latest `remainingSeconds`
  const secondsRef = useRef(remainingSeconds);

  // Keep the refs updated whenever the store changes
  useEffect(() => {
    secondsRef.current = remainingSeconds;
  }, [remainingSeconds]);

  const startCountdown = (seconds: number) => {
    setRemainingSeconds(seconds);

    const newIntervalId = setInterval(() => {
      const currentSeconds = secondsRef.current; // Read the latest value from the ref
      console.log("Tick", currentSeconds);

      if (currentSeconds <= 0) {
        setIntervalId(null);
      } else {
        setRemainingSeconds(currentSeconds - 1);
      }
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const stopCountDown = () => {
    setIntervalId(null);
    setRemainingSeconds(0);
  };

  // Calculate the time components
  const days = Math.floor(remainingSeconds / (DAY / SECOND));
  const hours = Math.floor((remainingSeconds % (DAY / SECOND)) / (HOUR / SECOND));
  const minutes = Math.floor((remainingSeconds % (HOUR / SECOND)) / (MINUTE / SECOND));
  const seconds = Math.floor(remainingSeconds % (MINUTE / SECOND));

  return { days, hours, minutes, seconds, remainingSeconds, startCountdown, stopCountDown };
}
