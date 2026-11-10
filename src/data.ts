import type { GameId } from './types';

export const GAME_META: Record<GameId, { word: string; tone: 'gold' | 'pink' | 'blue' }> = {
  missionario: { word: 'Bíblia', tone: 'gold' },
  escolinha: { word: 'Escola', tone: 'pink' },
  higiene: { word: 'Higiene', tone: 'blue' },
};

export const STICKERS: { id: string; name: string; game: GameId }[] = [
  { id: 'missionario-1', name: 'Pedrinha', game: 'missionario' },
  { id: 'missionario-2', name: 'Arca', game: 'missionario' },
  { id: 'missionario-3', name: 'Bolhas', game: 'missionario' },
  { id: 'missionario-4', name: 'História', game: 'missionario' },
  { id: 'missionario-5', name: 'Escondido', game: 'missionario' },
  { id: 'missionario-6', name: 'Quiz', game: 'missionario' },
  { id: 'missionario-7', name: 'Verdade', game: 'missionario' },
  { id: 'missionario-8', name: 'Frase', game: 'missionario' },
  { id: 'escolinha-1', name: 'Cor', game: 'escolinha' },
  { id: 'escolinha-2', name: 'Maçã', game: 'escolinha' },
  { id: 'escolinha-3', name: 'ABC', game: 'escolinha' },
  { id: 'escolinha-4', name: 'Conta', game: 'escolinha' },
  { id: 'escolinha-5', name: 'Forma', game: 'escolinha' },
  { id: 'higiene-1', name: 'Sabonete', game: 'higiene' },
  { id: 'higiene-2', name: 'Escova', game: 'higiene' },
  { id: 'higiene-3', name: 'Brinquedos', game: 'higiene' },
  { id: 'higiene-4', name: 'Banho', game: 'higiene' },
  { id: 'higiene-5', name: 'Rotina', game: 'higiene' },
];

export function stickerById(id: string) {
  return STICKERS.find((sticker) => sticker.id === id);
}

export const ANIMALS = [
  { id: 'ovelha', name: 'Ovelha' },
  { id: 'pomba', name: 'Pomba' },
  { id: 'elefante', name: 'Elefante' },
  { id: 'leao', name: 'Leão' },
  { id: 'girafa', name: 'Girafa' },
] as const;

export type AnimalId = (typeof ANIMALS)[number]['id'];

export const LOVE_SETS = [
  ['Amor', 'Paz', 'Luz', 'Bem'],
  ['Fé', 'Graça', 'Alegria', 'Paz'],
  ['Amor', 'Calma', 'Luz', 'Bem'],
];

export const STONES = [
  { id: 'azul', color: '#3d8bff', size: 34 },
  { id: 'dourada', color: '#ffc83a', size: 46 },
  { id: 'rosa', color: '#ff6fa8', size: 24 },
  { id: 'verde', color: '#3ddc78', size: 40 },
  { id: 'roxa', color: '#b06bff', size: 30 },
] as const;

export const COLOR_SWATCHES = [
  { id: 'vermelho', name: 'vermelho', hex: '#ff3b3b' },
  { id: 'azul', name: 'azul', hex: '#2f80ff' },
  { id: 'amarelo', name: 'amarelo', hex: '#ffd000' },
  { id: 'verde', name: 'verde', hex: '#22c55e' },
  { id: 'roxo', name: 'roxo', hex: '#a855f7' },
  { id: 'laranja', name: 'laranja', hex: '#ff8a00' },
] as const;

export const FRUIT_ROUNDS = [
  { say: 'Onde está a maçã vermelha?', correct: 'maca', options: ['maca', 'limao', 'uva'] },
  { say: 'Onde está a banana?', correct: 'banana', options: ['banana', 'laranja', 'pera'] },
  { say: 'Onde está a uva?', correct: 'uva', options: ['uva', 'maca', 'limao'] },
  { say: 'Onde está a laranja?', correct: 'laranja', options: ['laranja', 'banana', 'uva'] },
  { say: 'Onde está a pera?', correct: 'pera', options: ['pera', 'limao', 'maca'] },
  { say: 'Onde está o limão?', correct: 'limao', options: ['limao', 'laranja', 'banana'] },
] as const;

export const WORDS = [
  { say: 'Monta a palavra uva!', fruit: 'uva', letters: ['U', 'V', 'A'] },
  { say: 'Monta a palavra coco!', fruit: 'coco', letters: ['C', 'O', 'C', 'O'] },
  { say: 'Monta a palavra maçã!', fruit: 'maca', letters: ['M', 'A', 'Ç', 'Ã'] },
] as const;

export const TOYS = [
  { id: 'bola', color: 'vermelho', label: 'Bola' },
  { id: 'carro', color: 'azul', label: 'Carro' },
  { id: 'pato', color: 'amarelo', label: 'Pato' },
  { id: 'bloco', color: 'verde', label: 'Bloco' },
] as const;

export const BOXES = [
  { id: 'vermelho', hex: '#ff4d4d', label: 'Vermelha' },
  { id: 'azul', hex: '#3d8bff', label: 'Azul' },
  { id: 'amarelo', hex: '#ffd000', label: 'Amarela' },
  { id: 'verde', hex: '#3ddc78', label: 'Verde' },
] as const;

export const CONFETTI_COLORS = [
  '#ff4d4d',
  '#ffd000',
  '#3ddc78',
  '#3d8bff',
  '#ff4d8d',
  '#b06bff',
  '#ff8a1e',
  '#ffffff',
];
