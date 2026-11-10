import { Kid, Logo, Missionary, StarIcon } from '../art';
import type { KidVariant } from '../art';
import { GAME_META } from '../data';
import { taskCount } from '../tasks';
import type { AppState, GameId } from '../types';
import { Pips } from './Pips';

const ORDER: GameId[] = ['missionario', 'escolinha', 'higiene'];
const KIDS: Record<GameId, KidVariant> = {
  missionario: 'biblia',
  escolinha: 'escola',
  higiene: 'higiene',
};

export function Hub({
  state,
  onOpen,
  onAlbum,
}: {
  state: AppState;
  onOpen: (game: GameId) => void;
  onAlbum: () => void;
}) {
  return (
    <div className="stage">
      <header className="hub-top">
        <button className="album-btn" onClick={onAlbum} data-testid="album-open" aria-label="Álbum de figurinhas">
          <BookIcon />
          Figurinhas
        </button>
        <div className="star-pill" aria-label={`${state.totalStars} estrelas`}>
          <StarIcon />
          {state.totalStars}
        </div>
      </header>
      <Logo />
      <div className="speech-row">
        <div className="mascot-wrap">
          <Kid variant="escola" />
        </div>
        <p className="speech">Olá! Vamos brincar?</p>
      </div>
      <div className="hub-cards">
        {ORDER.map((id) => (
          <button
            key={id}
            className={`game-card tone-${id}`}
            onClick={() => onOpen(id)}
            data-testid={`card-${id}`}
          >
            <span className="card-pips">
              <Pips
                className={taskCount(id) > 5 ? 'many' : ''}
                value={state.games[id].currentLevel}
                total={taskCount(id)}
                label={`Fase ${state.games[id].currentLevel} de ${taskCount(id)}`}
              />
            </span>
            <span className="portrait">
              {id === 'missionario' ? <Missionary /> : <Kid variant={KIDS[id]} />}
            </span>
            <span className="card-word">{GAME_META[id].word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 10 h14 a6 6 0 0 1 6 6 v22 a6 6 0 0 0 -6 -4 H8z" fill="#fff" />
      <path d="M40 10 H26 a6 6 0 0 0 -6 6 v22 a6 6 0 0 1 6 -4 h14z" fill="#ffe14a" />
    </svg>
  );
}
