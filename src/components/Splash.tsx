import { useEffect, useMemo, useRef } from 'react';
import { Kid, Logo, Rainbow } from '../art';
import { CONFETTI_COLORS } from '../data';

export function Splash({ onDone }: { onDone: () => void }) {
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const went = useRef(false);

  const finish = () => {
    if (went.current) return;
    went.current = true;
    doneRef.current();
  };

  useEffect(() => {
    const timer = window.setTimeout(finish, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const bits = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${(index * 19) % 100}%`,
        delay: `${(index % 6) * 0.18}s`,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        size: 10 + (index % 4) * 4,
      })),
    [],
  );

  return (
    <div className="stage splash" onPointerDown={finish}>
      <div className="splash-bits" aria-hidden="true">
        {bits.map((bit) => (
          <span
            key={bit.id}
            className="spark"
            style={{
              left: bit.left,
              width: bit.size,
              height: bit.size,
              background: bit.color,
              animationDelay: bit.delay,
            }}
          />
        ))}
      </div>
      <Rainbow className="splash-rainbow" />
      <Logo big />
      <div className="splash-kids">
        <div className="kid-slot"><Kid variant="biblia" mood="happy" /></div>
        <div className="kid-slot"><Kid variant="escola" mood="happy" /></div>
        <div className="kid-slot"><Kid variant="higiene" mood="happy" /></div>
      </div>
    </div>
  );
}
