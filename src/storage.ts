import { defaultState } from './progress';
import { taskCount } from './tasks';
import type { AppState, GameId } from './types';

const KEY = 'aprenda-brincando-v1';
const GAMES: GameId[] = ['missionario', 'escolinha', 'higiene'];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const data = JSON.parse(raw) as Partial<AppState>;
    const games = defaultState().games;
    for (const id of GAMES) {
      const saved = data.games?.[id];
      if (!saved) continue;
      games[id] = {
        currentLevel: clamp(Number(saved.currentLevel) || 1, 1, taskCount(id)),
        winStreak: Math.max(0, Number(saved.winStreak) || 0),
        roundsCleared: Math.max(0, Number(saved.roundsCleared) || 0),
      };
    }
    return {
      totalStars: Math.max(0, Number(data.totalStars) || 0),
      unlockedStickers: Array.isArray(data.unlockedStickers)
        ? data.unlockedStickers.filter((item) => typeof item === 'string')
        : [],
      games,
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
