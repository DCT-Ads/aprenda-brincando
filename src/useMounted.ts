import { useCallback, useEffect, useRef } from 'react';

export function useMounted() {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted;
}

export function useRoundEnd(onSuccess: () => void) {
  const mounted = useMounted();
  const done = useRef(false);
  const successRef = useRef(onSuccess);
  successRef.current = onSuccess;
  const succeedSoon = useCallback((ms = 700) => {
    if (done.current) return;
    done.current = true;
    window.setTimeout(() => {
      if (mounted.current) successRef.current();
    }, ms);
  }, [mounted]);
  return { done, succeedSoon };
}
