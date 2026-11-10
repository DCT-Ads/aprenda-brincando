import type { AppState, GameId, GameProgress } from './types';

import { taskCount } from './tasks';

export const STREAK_TO_LEVEL_UP = 3;

export function defaultProgress(): GameProgress {
  return { currentLevel: 1, winStreak: 0, roundsCleared: 0 };
}

export function defaultState(): AppState {
  return {
    totalStars: 0,
    unlockedStickers: [],
    games: {
      missionario: defaultProgress(),
      escolinha: defaultProgress(),
      higiene: defaultProgress(),
    },
  };
}

export function handleAnswer(state: AppState, gameId: GameId, isCorrect: boolean) {
  const game = state.games[gameId];

  if (!isCorrect) {
    return {
      leveledUp: false,
      gameComplete: false,
      streakShown: 0,
      state: {
        ...state,
        games: {
          ...state.games,
          [gameId]: { ...game, winStreak: 0 },
        },
      },
    };
  }

  const winStreak = game.winStreak + 1;
  const reached = winStreak >= STREAK_TO_LEVEL_UP;
  const cap = taskCount(gameId);
  const leveledUp = reached && game.currentLevel < cap;
  const gameComplete = reached && game.currentLevel >= cap;

  const nextGame: GameProgress = {
    currentLevel: leveledUp ? game.currentLevel + 1 : game.currentLevel,
    winStreak: reached ? 0 : winStreak,
    roundsCleared: game.roundsCleared + 1,
  };

  return {
    leveledUp,
    gameComplete,
    streakShown: reached ? STREAK_TO_LEVEL_UP : winStreak,
    state: {
      ...state,
      totalStars: state.totalStars + 1,
      games: { ...state.games, [gameId]: nextGame },
    },
  };
}

export function registerMiss(state: AppState, gameId: GameId) {
  return handleAnswer(state, gameId, false).state;
}

export function awardRound(state: AppState, gameId: GameId) {
  const levelBefore = state.games[gameId].currentLevel;
  const result = handleAnswer(state, gameId, true);
  const stickerId = `${gameId}-${levelBefore}`;
  const isNew = !result.state.unlockedStickers.includes(stickerId);

  return {
    state: {
      ...result.state,
      unlockedStickers: isNew
        ? [...result.state.unlockedStickers, stickerId]
        : result.state.unlockedStickers,
    },
    leveledUp: result.leveledUp,
    gameComplete: result.gameComplete,
    stickerId,
    isNew,
    levelBefore,
  };
}
