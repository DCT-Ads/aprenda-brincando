import { useEffect, useMemo, useState } from 'react';
import { Fruit } from '../art';
import { playPop, speak } from '../audio';
import { COLOR_SWATCHES, FRUIT_ROUNDS, WORDS } from '../data';
import { Draggable, dropId } from '../drag';
import { shuffle, withCorrect } from '../random';
import { taskFor } from '../tasks';
import type { GameProps } from '../types';
import { useRoundEnd } from '../useMounted';
import { GameFrame } from '../components/GameFrame';

export function JogoEscolinha(props: GameProps) {
  switch (taskFor('escolinha', props.level)) {
    case 'find_color':
      return <Cores {...props} />;
    case 'find_object':
      return <Frutas {...props} />;
    case 'spell_word':
      return <Letras {...props} />;
    case 'count_objects':
      return <Contar {...props} />;
    case 'match_form':
      return <Formas {...props} />;
    default:
      return <Cores {...props} />;
  }
}

function Cores({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const correct = COLOR_SWATCHES[roundKey % COLOR_SWATCHES.length]!;
  const options = useMemo(
    () => withCorrect(COLOR_SWATCHES, correct, 2, roundKey + 2),
    [correct, roundKey],
  );
  const [shake, setShake] = useState('');
  const [happy, setHappy] = useState(false);
  const prompt = `Onde está o ${correct.name}?`;

  useEffect(() => {
    speak(prompt);
  }, [prompt]);

  const tap = (id: string) => {
    if (done.current) return;
    if (id !== correct.id) {
      setShake(id);
      onMiss();
      return;
    }
    setHappy(true);
    playPop();
    succeedSoon(600);
  };

  return (
    <GameFrame gameId="escolinha" level={level} streak={streak} stars={stars} prompt={prompt} happy={happy} onBack={onBack}>
      <div className="color-row">
        {options.map((color) => (
          <button
            key={color.id}
            className={shake === color.id ? 'color-btn shake' : 'color-btn'}
            style={{ background: color.hex }}
            aria-label={color.name}
            onClick={() => tap(color.id)}
            onAnimationEnd={() => setShake('')}
          />
        ))}
      </div>
    </GameFrame>
  );
}

function Frutas({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const round = FRUIT_ROUNDS[roundKey % FRUIT_ROUNDS.length]!;
  const options = useMemo(() => shuffle(round.options, roundKey + 5), [round, roundKey]);
  const [shake, setShake] = useState('');
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    speak(round.say);
  }, [round.say]);

  const tap = (id: string) => {
    if (done.current) return;
    if (id !== round.correct) {
      setShake(id);
      onMiss();
      return;
    }
    setHappy(true);
    playPop();
    succeedSoon(650);
  };

  return (
    <GameFrame gameId="escolinha" level={level} streak={streak} stars={stars} prompt={round.say} happy={happy} onBack={onBack}>
      <div className="fruit-row">
        {options.map((id) => (
          <button
            key={id}
            className={shake === id ? 'fruit-btn shake' : 'fruit-btn'}
            aria-label={id}
            onClick={() => tap(id)}
            onAnimationEnd={() => setShake('')}
          >
            <Fruit id={id} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

type Tile = { uid: string; letter: string };

function Letras({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const word = WORDS[roundKey % WORDS.length]!;
  const [slots, setSlots] = useState<(string | null)[]>(() => word.letters.map(() => null));
  const [bank, setBank] = useState<Tile[]>(() => makeBank(word.letters, roundKey));
  const [shake, setShake] = useState(-1);
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    speak(word.say);
  }, [word.say]);

  const place = (tile: Tile, index: number) => {
    if (done.current || index < 0 || slots[index]) return false;
    if (tile.letter !== word.letters[index]) {
      setShake(index);
      onMiss();
      return false;
    }
    const next = slots.map((value, slot) => (slot === index ? tile.letter : value));
    setSlots(next);
    setBank((items) => items.filter((item) => item.uid !== tile.uid));
    playPop();
    if (next.every(Boolean)) {
      setHappy(true);
      succeedSoon(700);
    }
    return true;
  };

  return (
    <GameFrame gameId="escolinha" level={level} streak={streak} stars={stars} prompt={word.say} happy={happy} onBack={onBack}>
      <div className="word-fruit">
        <Fruit id={word.fruit} />
      </div>
      <div className="letter-row">
        {word.letters.map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className={`letter-slot${slots.findIndex((slot) => !slot) === index ? ' next' : ''}${shake === index ? ' shake' : ''}`}
            data-drop={`slot-${index}`}
            onAnimationEnd={() => setShake(-1)}
          >
            {slots[index] ?? ''}
          </div>
        ))}
      </div>
      <div className="letter-row">
        {bank.map((tile) => (
          <Draggable
            key={tile.uid}
            className="letter-tile"
            label={tile.letter}
            disabled={done.current}
            onDrop={(point) => {
              if (point.distance < 14) {
                return place(tile, slots.findIndex((slot) => slot === null));
              }
              const zone = dropId(point.x, point.y);
              if (!zone?.startsWith('slot-')) return false;
              return place(tile, Number(zone.slice(5)));
            }}
          >
            {tile.letter}
          </Draggable>
        ))}
      </div>
    </GameFrame>
  );
}

function makeBank(letters: readonly string[], seed: number): Tile[] {
  const tiles: Tile[] = letters.map((letter, index) => ({ uid: `ok-${index}`, letter }));
  const extras = shuffle(
    ['B', 'D', 'F', 'L', 'P', 'R', 'T', 'X'].filter((letter) => !letters.includes(letter)),
    seed,
  ).slice(0, 2);
  extras.forEach((letter, index) => tiles.push({ uid: `x-${index}`, letter }));
  return shuffle(tiles, seed + 1);
}

const COUNTS = [
  { fruit: 'maca', name: 'maçãs', n: 3 },
  { fruit: 'banana', name: 'bananas', n: 2 },
  { fruit: 'uva', name: 'uvas', n: 4 },
  { fruit: 'laranja', name: 'laranjas', n: 1 },
] as const;

function Contar({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const round = COUNTS[roundKey % COUNTS.length]!;
  const options = useMemo(() => {
    const extras = [1, 2, 3, 4, 5].filter((value) => value !== round.n);
    return shuffle([round.n, ...shuffle(extras, roundKey).slice(0, 2)], roundKey + 6);
  }, [round.n, roundKey]);
  const [shake, setShake] = useState('');
  const [happy, setHappy] = useState(false);
  const prompt = `Quantas ${round.name}?`;

  useEffect(() => {
    speak(prompt);
  }, [prompt]);

  const tap = (value: number) => {
    if (done.current) return;
    if (value !== round.n) {
      setShake(String(value));
      onMiss();
      return;
    }
    setHappy(true);
    playPop();
    succeedSoon(600);
  };

  return (
    <GameFrame gameId="escolinha" level={level} streak={streak} stars={stars} prompt={prompt} happy={happy} onBack={onBack}>
      <div className="count-items" aria-hidden="true">
        {Array.from({ length: round.n }, (_, index) => (
          <Fruit key={index} id={round.fruit} />
        ))}
      </div>
      <div className="choice-row">
        {options.map((value) => (
          <button
            key={value}
            className={shake === String(value) ? 'num-btn shake' : 'num-btn'}
            onClick={() => tap(value)}
            aria-label={String(value)}
            onAnimationEnd={() => setShake('')}
          >
            {value}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

const FORMS = ['circulo', 'quadrado', 'triangulo'] as const;
type FormId = (typeof FORMS)[number];

const FORM_SAY: Record<FormId, string> = {
  circulo: 'Encaixa o círculo!',
  quadrado: 'Encaixa o quadrado!',
  triangulo: 'Encaixa o triângulo!',
};

function Formas({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const correct = FORMS[roundKey % FORMS.length]!;
  const pieces = useMemo(() => shuffle(FORMS, roundKey + 3), [roundKey]);
  const [happy, setHappy] = useState(false);
  const [shake, setShake] = useState('');

  useEffect(() => {
    speak(FORM_SAY[correct]);
  }, [correct]);

  const dropShape = (id: FormId, point: { x: number; y: number }) => {
    if (done.current) return false;
    if (dropId(point.x, point.y) !== 'forma') return false;
    if (id !== correct) {
      setShake(id);
      onMiss();
      return false;
    }
    setHappy(true);
    playPop();
    succeedSoon(650);
    return true;
  };

  return (
    <GameFrame
      gameId="escolinha"
      level={level}
      streak={streak}
      stars={stars}
      prompt={FORM_SAY[correct]}
      happy={happy}
      onBack={onBack}
    >
      <div className="shape-hole" data-drop="forma" aria-label="Buraco">
        <Shape id={correct} ghost />
      </div>
      <div className="choice-row">
        {pieces.map((id) => (
          <Draggable
            key={id}
            className={shake === id ? 'shape-piece shake' : 'shape-piece'}
            label={id}
            onDrop={(point) => dropShape(id, point)}
          >
            <Shape id={id} />
          </Draggable>
        ))}
      </div>
    </GameFrame>
  );
}

function Shape({ id, ghost = false }: { id: FormId; ghost?: boolean }) {
  const fill = ghost ? '#ffffffaa' : id === 'circulo' ? '#ff4d4d' : id === 'quadrado' ? '#3d8bff' : '#ffd000';
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {id === 'circulo' && <circle cx="50" cy="50" r="36" fill={fill} stroke="#2c2148" strokeWidth="4" />}
      {id === 'quadrado' && <rect x="16" y="16" width="68" height="68" rx="12" fill={fill} stroke="#2c2148" strokeWidth="4" />}
      {id === 'triangulo' && <polygon points="50,10 92,88 8,88" fill={fill} stroke="#2c2148" strokeWidth="4" />}
    </svg>
  );
}
