import { useEffect, useState } from 'react';

export type Tick = {
  tick: number;
};
export const useTick = (intervalMs: number): Tick => {
  const [tick, setTick] = useState(() => new Date().getTime());
  useEffect(() => {
    setInterval(() => {
      setTick(new Date().getTime());
    }, intervalMs);
  }, [intervalMs]);
  return { tick };
};
