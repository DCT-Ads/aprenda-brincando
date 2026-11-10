import type { GameId } from './types';

export type TaskType =
  | 'match_shape'
  | 'drag_to_target'
  | 'pop_bubble'
  | 'order_sequence'
  | 'find_hidden'
  | 'bible_quiz'
  | 'true_or_false'
  | 'complete_phrase'
  | 'find_color'
  | 'find_object'
  | 'spell_word'
  | 'count_objects'
  | 'match_form'
  | 'soap_hands'
  | 'brush_teeth'
  | 'organize_toys'
  | 'bath_sequence'
  | 'wash_hands_routine';

export const GAME_TASKS: Record<GameId, readonly TaskType[]> = {
  missionario: [
    'match_shape',
    'drag_to_target',
    'pop_bubble',
    'order_sequence',
    'find_hidden',
    'bible_quiz',
    'true_or_false',
    'complete_phrase',
  ],
  escolinha: ['find_color', 'find_object', 'spell_word', 'count_objects', 'match_form'],
  higiene: ['soap_hands', 'brush_teeth', 'organize_toys', 'bath_sequence', 'wash_hands_routine'],
};

export function taskCount(gameId: GameId): number {
  return GAME_TASKS[gameId].length;
}

export function taskFor(gameId: GameId, level: number): TaskType {
  const tasks = GAME_TASKS[gameId];
  const index = Math.min(Math.max(level, 1), tasks.length) - 1;
  return tasks[index]!;
}
