import { useEffect, useRef } from 'react';
import { Kid, Missionary, StarIcon, StickerGraphic } from '../art';
import type { KidVariant } from '../art';
import { playLevelUp, playVictory, speak } from '../audio';
import { stickerById } from '../data';
import type { GameId, VictoryInfo } from '../types';
import { Confetti } from './Confetti';

const KIDS: Record<GameId, KidVariant> = {
  missionario: 'biblia',
  escolinha: 'escola',
  higiene: 'higiene',
};

export function Victory({
  info,
  onNext,
  onHome,
}: {
  info: VictoryInfo;
  onNext: () => void;
  onHome: () => void;
}) {
  const nextRef = useRef(onNext);
  const homeRef = useRef(onHome);
  nextRef.current = onNext;
  homeRef.current = onHome;
  const left = useRef(false);

  const sticker = stickerById(info.stickerId);
  const title = info.gameComplete ? 'Jogo completo!' : info.leveledUp ? 'Nova fase!' : 'Eba!';
  const line = info.gameComplete
    ? 'Você terminou todas as missões!'
    : info.leveledUp
      ? 'Parabéns! Nova missão desbloqueada!'
      : info.gameId === 'higiene'
        ? 'Mãos limpas, coração feliz!'
        : 'Muito bem!';

  const go = () => {
    if (left.current) return;
    left.current = true;
    if (info.gameComplete) homeRef.current();
    else nextRef.current();
  };

  useEffect(() => {
    if (info.gameComplete || info.leveledUp) playLevelUp();
    else playVictory();
    speak(line);
    const timer = window.setTimeout(go, 4200);
    return () => window.clearTimeout(timer);
  }, [info.gameComplete, info.leveledUp, line]);

  return (
    <div className={info.gameId === 'missionario' ? 'victory victory-bible' : 'victory'}>
      <Confetti />
      <header className="victory-top">
        <button className="icon-btn" onClick={onHome} aria-label="Início">
          <HomeIcon />
        </button>
      </header>
      <div className="victory-main">
        <div className="victory-kid">
          {info.gameId === 'missionario' ? (
            <Missionary mood="happy" />
          ) : (
            <Kid variant={KIDS[info.gameId]} mood="happy" />
          )}
        </div>
        <h1 className="victory-title">{title}</h1>
        <p className="victory-line">{line}</p>
        <div className="star-pop">
          <StarIcon />
          <span>+1</span>
        </div>
        {info.isNew && sticker && (
          <div className="sticker-hero" aria-label={sticker.name}>
            <StickerGraphic id={sticker.id} />
            <div className="sticker-ghost" aria-hidden="true">
              <StickerGraphic id={sticker.id} />
            </div>
          </div>
        )}
      </div>
      <button
        className={info.gameComplete || info.leveledUp ? 'big-btn go' : 'big-btn'}
        onClick={go}
        data-testid="next-round"
      >
        {info.gameComplete ? 'Início' : info.leveledUp ? 'Próxima fase' : 'Jogar de novo'}
      </button>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 22 L24 8 L40 22 V40 H30 V28 H18 V40 H8 Z" fill="#ff8a1e" stroke="#2c2148" strokeWidth="3" />
    </svg>
  );
}
