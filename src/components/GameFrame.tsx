import type { ReactNode } from 'react';
import { BibleCast, Kid, Missionary, StarIcon } from '../art';
import type { KidVariant } from '../art';
import { GAME_META } from '../data';
import { taskCount } from '../tasks';
import type { GameId } from '../types';
import { Pips } from './Pips';

const KIDS: Record<GameId, KidVariant> = {
  missionario: 'biblia',
  escolinha: 'escola',
  higiene: 'higiene',
};

export function GameFrame({
  gameId,
  level,
  streak,
  stars,
  prompt,
  happy = false,
  cast = true,
  onBack,
  children,
}: {
  gameId: GameId;
  level: number;
  streak: number;
  stars: number;
  prompt: string;
  happy?: boolean;
  cast?: boolean;
  onBack: () => void;
  children: ReactNode;
}) {
  const meta = GAME_META[gameId];
  const total = taskCount(gameId);
  return (
    <div className={`frame tone-${meta.tone}`}>
      <header className="frame-top">
        <button className="icon-btn" onClick={onBack} aria-label="Voltar">
          <Arrow />
        </button>
        <div className={gameId === 'missionario' ? 'frame-title title-gold' : 'frame-title'}>{meta.word}</div>
        <div className="star-pill" aria-label={`${stars} estrelas`}>
          <StarIcon />
          {stars}
        </div>
      </header>
      <div className="frame-mid">
        <Pips className={total > 5 ? 'many' : ''} value={level} total={total} label={`Fase ${level} de ${total}`} />
        <Pips className="hearts" value={Math.min(streak, 3)} label={`${streak} acertos`} />
      </div>
      <div className="speech-row">
        <div className="mascot-wrap">
          {gameId === 'missionario' ? (
            <Missionary mood={happy ? 'happy' : 'idle'} />
          ) : (
            <Kid variant={KIDS[gameId]} mood={happy ? 'happy' : 'idle'} />
          )}
        </div>
        <p className="prompt" data-testid="prompt">{prompt}</p>
      </div>
      {gameId === 'missionario' && cast && <BibleCast />}
      <div className="board">{children}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M30 10 L14 24 L30 38" fill="none" stroke="#2c2148" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
