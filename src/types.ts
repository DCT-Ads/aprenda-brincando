export type GameId = 'missionario' | 'escolinha' | 'higiene';

export type Screen = 'splash' | 'hub' | 'album' | 'victory' | GameId;

export interface GameProgress {
  currentLevel: number;
  winStreak: number;
  roundsCleared: number;
}

export interface AppState {
  totalStars: number;
  unlockedStickers: string[];
  games: Record<GameId, GameProgress>;
}

export type VictoryInfo = {
  gameId: GameId;
  leveledUp: boolean;
  gameComplete: boolean;
  stickerId: string;
  isNew: boolean;
  levelBefore: number;
};

export type GameProps = {
  level: number;
  streak: number;
  stars: number;
  roundKey: number;
  onSuccess: () => void;
  onMiss: () => void;
  onBack: () => void;
};
