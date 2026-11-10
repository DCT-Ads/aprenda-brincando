import { StarIcon, StickerGraphic } from '../art';
import { speak } from '../audio';
import { STICKERS } from '../data';
import type { AppState } from '../types';

export function Album({ state, onBack }: { state: AppState; onBack: () => void }) {
  const owned = new Set(state.unlockedStickers);
  const any = owned.size > 0;

  return (
    <div className="stage">
      <header className="album-top">
        <button className="icon-btn" onClick={onBack} aria-label="Voltar">
          <Arrow />
        </button>
        <h1 className="frame-title">Figurinhas</h1>
        <div className="star-pill" aria-label={`${state.totalStars} estrelas`}>
          <StarIcon />
          {state.totalStars}
        </div>
      </header>
      <div className="album-sheet">
        {!any && <p className="album-empty">Brinca e ganha!</p>}
        <div className="album-grid">
          {STICKERS.map((sticker) => {
            const has = owned.has(sticker.id);
            return (
              <button
                key={sticker.id}
                className={has ? 'sticker' : 'sticker locked'}
                onClick={() => speak(has ? sticker.name : 'Vamos brincar pra ganhar!')}
                aria-label={has ? sticker.name : 'Figurinha fechada'}
              >
                <StickerGraphic id={sticker.id} />
                <small>{has ? sticker.name : '?'}</small>
              </button>
            );
          })}
        </div>
      </div>
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
