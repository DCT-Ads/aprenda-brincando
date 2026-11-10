import { useMemo } from 'react';
import { CONFETTI_COLORS } from '../data';

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 8) * 0.05}s`,
        duration: `${1.6 + (index % 5) * 0.25}s`,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        size: 8 + (index % 5) * 3,
        round: index % 3 === 0,
      })),
    [],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="bit"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.round ? piece.size : piece.size * 0.55,
            background: piece.color,
            borderRadius: piece.round ? '50%' : 3,
            animationDuration: piece.duration,
            animationDelay: piece.delay,
          }}
        />
      ))}
    </div>
  );
}
