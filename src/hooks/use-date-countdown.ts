import { useState, useEffect } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export function useDateCountdown(secondsToCount: number, intervalMs = SECOND) {
  const [remainingSeconds, setRemainingSeconds] = useState(secondsToCount);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    if (timerId) {
      clearInterval(timerId); // Clear the existing interval
    }

    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(id); // Stop the interval when it hits 0
          return 0;
        }
        return prev - intervalMs / SECOND;
      });
    }, intervalMs);

    setTimerId(id); // Save the new interval ID
  };

  useEffect(() => {
    startCountdown(); // Start the countdown on mount or when dependencies change

    // Return runs when the component unmounts (is removed from the view)
    return () => {
      if (timerId) {
        clearInterval(timerId); // Cleanup interval on unmount
      }
    };
  }, []);

  // Function to update the remaining seconds
  const updateRemainingSeconds = (newSeconds: number) => {
    setRemainingSeconds(newSeconds);
    startCountdown(); // Restart the countdown when the time changes
  };

  // Calculate the time components
  const days = Math.floor(remainingSeconds / (DAY / SECOND));
  const hours = Math.floor((remainingSeconds % (DAY / SECOND)) / (HOUR / SECOND));
  const minutes = Math.floor((remainingSeconds % (HOUR / SECOND)) / (MINUTE / SECOND));
  const seconds = Math.floor(remainingSeconds % (MINUTE / SECOND));

  return { days, hours, minutes, seconds, updateRemainingSeconds };
}
