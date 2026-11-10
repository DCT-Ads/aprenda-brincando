import { useEffect, useMemo, useState } from 'react';
import { Animal, Ark, Missionary, Pebble, StarIcon } from '../art';
import { playPop, speak } from '../audio';
import { ANIMALS, LOVE_SETS, STONES } from '../data';
import type { AnimalId } from '../data';
import { Draggable, dropId } from '../drag';
import type { DragPoint } from '../drag';
import { shuffle, withCorrect } from '../random';
import { taskFor } from '../tasks';
import type { GameProps } from '../types';
import { useRoundEnd } from '../useMounted';
import { GameFrame } from '../components/GameFrame';

const BUBBLE_COLORS = ['#7ad7ff', '#ffd36a', '#ff8ec8', '#9dffb0'];

export function JogoMissionario(props: GameProps) {
  switch (taskFor('missionario', props.level)) {
    case 'match_shape':
      return <Pedrinhas {...props} />;
    case 'drag_to_target':
      return <Arca {...props} />;
    case 'pop_bubble':
      return <Bolhas {...props} />;
    case 'order_sequence':
      return <Historia {...props} />;
    case 'find_hidden':
      return <Escondido {...props} />;
    case 'bible_quiz':
      return <Quiz {...props} />;
    case 'true_or_false':
      return <Verdadeiro {...props} />;
    case 'complete_phrase':
      return <Frase {...props} />;
    default:
      return <Pedrinhas {...props} />;
  }
}

function Arca({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const correct = ANIMALS[roundKey % ANIMALS.length]!;
  const options = useMemo(
    () => withCorrect(ANIMALS, correct, 1, roundKey + 3),
    [correct, roundKey],
  );
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    speak('Leva o amiguinho pra arca!');
  }, []);

  const dropAnimal = (id: AnimalId, point: DragPoint, el: HTMLElement) => {
    if (done.current) return false;
    if (dropId(point.x, point.y, el) !== 'arca') return false;
    if (id !== correct.id) {
      onMiss();
      return false;
    }
    setSolved(true);
    playPop();
    succeedSoon(800);
    return true;
  };

  return (
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Pra arca!"
      happy={solved}
      onBack={onBack}
    >
      <div className="ark-block">
        <Ark />
        <div className="ark-slot" data-drop="arca">
          <Animal id={correct.id} silhouette />
        </div>
      </div>
      <div className="choice-row">
        {options.map((animal) => (
          <Draggable
            key={animal.id}
            className="choice-card"
            label={animal.name}
            disabled={solved}
            onDrop={(point, el) => dropAnimal(animal.id, point, el)}
          >
            <Animal id={animal.id} />
          </Draggable>
        ))}
      </div>
    </GameFrame>
  );
}

function Bolhas({ level, streak, stars, roundKey, onSuccess, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const words = LOVE_SETS[roundKey % LOVE_SETS.length]!;
  const [popped, setPopped] = useState<string[]>([]);
  const [floatWord, setFloatWord] = useState('');

  useEffect(() => {
    speak('Estoura as bolhas!');
  }, []);

  const pop = (id: string, word: string) => {
    if (done.current || popped.includes(id)) return;
    const next = [...popped, id];
    setPopped(next);
    setFloatWord(word);
    speak(word);
    playPop();
    if (next.length === words.length) succeedSoon(900);
  };

  return (
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Estoura!"
      happy={popped.length === words.length}
      onBack={onBack}
    >
      <div className="bubble-field">
        {words.map((word, index) => {
          const id = `b${index}`;
          return (
            <button
              key={id}
              className={popped.includes(id) ? 'bubble popped' : 'bubble'}
              style={{
                left: `${8 + (index % 2) * 46}%`,
                top: `${6 + Math.floor(index / 2) * 42}%`,
                width: 100 + (index % 3) * 16,
                height: 100 + (index % 3) * 16,
                ['--bubble' as string]: BUBBLE_COLORS[index],
              }}
              aria-label="Bolha"
              onClick={() => pop(id, word)}
            />
          );
        })}
        {floatWord && <div className="float-word">{floatWord}</div>}
      </div>
    </GameFrame>
  );
}

function Pedrinhas({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const correct = STONES[roundKey % STONES.length]!;
  const options = useMemo(
    () => withCorrect(STONES, correct, 2, roundKey + 8),
    [correct, roundKey],
  );
  const [shake, setShake] = useState('');
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    speak('Acha a pedrinha igual!');
  }, []);

  const choose = (id: string) => {
    if (done.current) return;
    if (id !== correct.id) {
      setShake(id);
      onMiss();
      return;
    }
    setHappy(true);
    playPop();
    succeedSoon(650);
  };

  return (
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Igual!"
      happy={happy}
      onBack={onBack}
    >
      <div className="ref-stone" aria-hidden="true">
        <Pebble color={correct.color} size={correct.size} />
      </div>
      <div className="stone-row">
        {options.map((stone) => (
          <button
            key={stone.id}
            className={shake === stone.id ? 'stone-btn shake' : 'stone-btn'}
            onClick={() => choose(stone.id)}
            aria-label="Pedrinha"
            onAnimationEnd={() => setShake('')}
          >
            <Pebble color={stone.color} size={stone.size} />
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

const STORY = [
  { id: 'viu', label: 'Viu', tone: '#ffd36a' },
  { id: 'pedra', label: 'Pedra', tone: '#9ad8ff' },
  { id: 'venceu', label: 'Venceu', tone: '#b8f5a8' },
] as const;

function Historia({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const cards = useMemo(() => shuffle(STORY, roundKey + 4), [roundKey]);
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [shake, setShake] = useState(-1);

  useEffect(() => {
    speak('Coloca a história na ordem!');
  }, []);

  const place = (id: string, index: number) => {
    if (done.current || index < 0 || slots[index]) return false;
    if (STORY[index]?.id !== id) {
      setShake(index);
      onMiss();
      return false;
    }
    const next = slots.map((value, slot) => (slot === index ? id : value));
    setSlots(next);
    playPop();
    if (next.every(Boolean)) succeedSoon(700);
    return true;
  };

  return (
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Na ordem!"
      happy={slots.every(Boolean)}
      cast={false}
      onBack={onBack}
    >
      <div className="story-row">
        {STORY.map((step, index) => (
          <div
            key={step.id}
            className={`story-slot${slots.findIndex((slot) => !slot) === index ? ' next' : ''}${shake === index ? ' shake' : ''}`}
            data-drop={`story-${index}`}
            onAnimationEnd={() => setShake(-1)}
          >
            {slots[index] ? <StoryFace id={slots[index]!} /> : index + 1}
          </div>
        ))}
      </div>
      <div className="story-row">
        {cards
          .filter((card) => !slots.includes(card.id))
          .map((card) => (
            <Draggable
              key={card.id}
              className="story-card"
              label={card.label}
              onDrop={(point) => {
                const zone = dropId(point.x, point.y);
                const index = zone?.startsWith('story-')
                  ? Number(zone.slice(6))
                  : point.distance < 14
                    ? slots.findIndex((slot) => slot === null)
                    : -1;
                return place(card.id, index);
              }}
            >
              <span className="story-face" style={{ background: card.tone }}>
                <StoryFace id={card.id} />
              </span>
              <small>{card.label}</small>
            </Draggable>
          ))}
      </div>
    </GameFrame>
  );
}

function StoryFace({ id }: { id: string }) {
  if (id === 'pedra') return <Pebble color="#ffc83a" size={28} />;
  if (id === 'venceu') return <StarIcon />;
  return <span className="giant-mark" aria-hidden="true" />;
}

const HUNTS = [
  { id: 'pomba', say: 'Onde está a pomba?', prompt: 'A pomba!' },
  { id: 'ovelha', say: 'Onde está a ovelha?', prompt: 'A ovelha!' },
  { id: 'missionario', say: 'Onde está o missionário?', prompt: 'Ele!' },
] as const;

const HIDE_SPOTS = [
  { top: '54%', left: '8%' },
  { top: '16%', left: '38%' },
  { top: '46%', left: '64%' },
];

function Escondido({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const hunt = HUNTS[roundKey % HUNTS.length]!;
  const placed = useMemo(
    () => shuffle(HUNTS, roundKey + 2).map((item, index) => ({ ...item, ...HIDE_SPOTS[index]! })),
    [roundKey],
  );
  const [happy, setHappy] = useState(false);
  const [shake, setShake] = useState('');

  useEffect(() => {
    speak(hunt.say);
  }, [hunt.say]);

  const tap = (id: string) => {
    if (done.current) return;
    if (id !== hunt.id) {
      setShake(id);
      onMiss();
      return;
    }
    setHappy(true);
    playPop();
    succeedSoon(650);
  };

  return (
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt={hunt.prompt}
      happy={happy}
      cast={false}
      onBack={onBack}
    >
      <div className="hide-scene">
        <span className="hide-tree" />
        <span className="hide-bush" />
        <span className="hide-flower" />
        {placed.map((item) => (
          <button
            key={item.id}
            className={shake === item.id ? 'hide-target shake' : 'hide-target'}
            style={{ top: item.top, left: item.left }}
            aria-label={item.prompt}
            onClick={() => tap(item.id)}
            onAnimationEnd={() => setShake('')}
          >
            {item.id === 'missionario' ? <Missionary /> : <Animal id={item.id} />}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

const QUIZZES = [
  {
    say: 'Quem construiu a arca?',
    prompt: 'Quem?',
    correct: 'noe',
    options: [
      { id: 'noe', label: 'Noé' },
      { id: 'ovelha', label: 'Ovelha' },
      { id: 'pomba', label: 'Pomba' },
    ],
  },
  {
    say: 'Quem voou até a arca?',
    prompt: 'Quem voou?',
    correct: 'pomba',
    options: [
      { id: 'pomba', label: 'Pomba' },
      { id: 'elefante', label: 'Elefante' },
      { id: 'leao', label: 'Leão' },
    ],
  },
  {
    say: 'O que Davi escolheu?',
    prompt: 'O quê?',
    correct: 'pedra',
    options: [
      { id: 'pedra', label: 'Pedra' },
      { id: 'arca', label: 'Arca' },
      { id: 'estrela', label: 'Estrela' },
    ],
  },
];

function Quiz({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const round = QUIZZES[roundKey % QUIZZES.length]!;
  const options = useMemo(() => shuffle(round.options, roundKey + 2), [round, roundKey]);
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
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt={round.prompt}
      happy={happy}
      cast={false}
      onBack={onBack}
    >
      <div className="quiz-row">
        {options.map((option) => (
          <button
            key={option.id}
            className={shake === option.id ? 'quiz-card shake' : 'quiz-card'}
            onClick={() => tap(option.id)}
            aria-label={option.label}
            onAnimationEnd={() => setShake('')}
          >
            <BibleFace id={option.id} />
            <small>{option.label}</small>
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

const FACTS = [
  { say: 'Noé construiu a arca.', yes: true },
  { say: 'A ovelha voa no céu.', yes: false },
  { say: 'Jonas foi engolido por uma baleia.', yes: true },
] as const;

function Verdadeiro({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const fact = FACTS[roundKey % FACTS.length]!;
  const [shake, setShake] = useState('');
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    speak(fact.say);
  }, [fact.say]);

  const tap = (yes: boolean) => {
    if (done.current) return;
    if (yes !== fact.yes) {
      setShake(yes ? 'sim' : 'nao');
      onMiss();
      return;
    }
    setHappy(true);
    playPop();
    succeedSoon(650);
  };

  return (
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Verdade?"
      happy={happy}
      cast={false}
      onBack={onBack}
    >
      <div className="yesno-row">
        <button
          className={shake === 'sim' ? 'yesno yes shake' : 'yesno yes'}
          onClick={() => tap(true)}
          aria-label="Sim"
          onAnimationEnd={() => setShake('')}
        >
          <Mark kind="yes" />
          <small>Sim</small>
        </button>
        <button
          className={shake === 'nao' ? 'yesno no shake' : 'yesno no'}
          onClick={() => tap(false)}
          aria-label="Não"
          onAnimationEnd={() => setShake('')}
        >
          <Mark kind="no" />
          <small>Não</small>
        </button>
      </div>
    </GameFrame>
  );
}

const PHRASES = [
  {
    say: 'Deus é... amor, chuva ou noite?',
    prompt: 'Deus é...',
    correct: 'amor',
    options: [
      { id: 'amor', label: 'Amor' },
      { id: 'chuva', label: 'Chuva' },
      { id: 'noite', label: 'Noite' },
    ],
  },
  {
    say: 'A arca é do... Noé, sol ou bola?',
    prompt: 'A arca é do...',
    correct: 'noe',
    options: [
      { id: 'noe', label: 'Noé' },
      { id: 'sol', label: 'Sol' },
      { id: 'bola', label: 'Bola' },
    ],
  },
  {
    say: 'A pomba trouxe... paz, pedra ou bola?',
    prompt: 'A pomba trouxe...',
    correct: 'paz',
    options: [
      { id: 'paz', label: 'Paz' },
      { id: 'pedra', label: 'Pedra' },
      { id: 'bola', label: 'Bola' },
    ],
  },
];

function Frase({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const round = PHRASES[roundKey % PHRASES.length]!;
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
    <GameFrame
      gameId="missionario"
      level={level}
      streak={streak}
      stars={stars}
      prompt={round.prompt}
      happy={happy}
      cast={false}
      onBack={onBack}
    >
      <div className="phrase-row">
        {options.map((option) => (
          <button
            key={option.id}
            className={shake === option.id ? 'phrase-card shake' : 'phrase-card'}
            onClick={() => tap(option.id)}
            aria-label={option.label}
            onAnimationEnd={() => setShake('')}
          >
            <BibleFace id={option.id} />
            <small>{option.label}</small>
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

function BibleFace({ id }: { id: string }) {
  if (id === 'noe') return <Missionary />;
  if (id === 'ovelha' || id === 'pomba' || id === 'elefante' || id === 'leao') return <Animal id={id} />;
  if (id === 'pedra') return <Pebble color="#ffc83a" size={36} />;
  if (id === 'arca') return <Ark />;
  if (id === 'estrela') return <StarIcon />;
  if (id === 'amor' || id === 'paz') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 84 C18 58 12 34 30 24 C42 16 50 28 50 36 C50 28 58 16 70 24 C88 34 82 58 50 84Z" fill={id === 'amor' ? '#ff4d6a' : '#7ad7ff'} stroke="#2c2148" strokeWidth="4" />
      </svg>
    );
  }
  if (id === 'chuva') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <ellipse cx="50" cy="40" rx="28" ry="18" fill="#d7e4ff" stroke="#2c2148" strokeWidth="4" />
        <path d="M34 68 l8 16 M50 64 l8 16 M66 68 l8 16" fill="none" stroke="#3d8bff" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'noite') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M62 18 A30 30 0 1 0 78 62 A24 24 0 0 1 62 18Z" fill="#ffe14a" stroke="#2c2148" strokeWidth="4" />
      </svg>
    );
  }
  if (id === 'sol') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="22" fill="#ffd000" stroke="#2c2148" strokeWidth="4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="28" fill="#ff4d4d" stroke="#2c2148" strokeWidth="4" />
    </svg>
  );
}

function Mark({ kind }: { kind: 'yes' | 'no' }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {kind === 'yes' ? (
        <path d="M22 52 l18 18 l40-42" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M28 28 l44 44 M72 28 l-44 44" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
      )}
    </svg>
  );
}
