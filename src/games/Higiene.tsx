import { useEffect, useMemo, useRef, useState } from 'react';
import { Brush, Germ, HandsArt, SoapBar, Toy } from '../art';
import { playPop, playTick, speak } from '../audio';
import { BOXES, TOYS } from '../data';
import { Draggable, dropId } from '../drag';
import { mulberry32, shuffle } from '../random';
import { taskFor } from '../tasks';
import type { GameProps } from '../types';
import { useRoundEnd } from '../useMounted';
import { GameFrame } from '../components/GameFrame';

const SPOTS = [
  { id: 'g1', x: '22%', y: '48%', color: '#7d5cff' },
  { id: 'g2', x: '62%', y: '44%', color: '#3dce55' },
  { id: 'g3', x: '34%', y: '70%', color: '#ff8a1e' },
  { id: 'g4', x: '70%', y: '68%', color: '#ff4d8d' },
];

const ZONES = ['left', 'mid', 'right'] as const;
type Zone = (typeof ZONES)[number];

export function JogoHigiene(props: GameProps) {
  switch (taskFor('higiene', props.level)) {
    case 'soap_hands':
      return <Sabonete {...props} />;
    case 'brush_teeth':
      return <Escova {...props} />;
    case 'organize_toys':
      return <Brinquedos {...props} />;
    case 'bath_sequence':
      return <Banho {...props} />;
    case 'wash_hands_routine':
      return <Rotina {...props} />;
    default:
      return <Sabonete {...props} />;
  }
}

function overlaps(soap: HTMLElement, spot: HTMLElement) {
  const a = soap.getBoundingClientRect();
  const b = spot.getBoundingClientRect();
  const ax = a.left + a.width / 2;
  const ay = a.top + a.height / 2;
  const bx = b.left + b.width / 2;
  const by = b.top + b.height / 2;
  return Math.hypot(ax - bx, ay - by) < 72;
}

function Sabonete({ level, streak, stars, onSuccess, onBack }: GameProps) {
  const { succeedSoon } = useRoundEnd(onSuccess);
  const [clean, setClean] = useState<Set<string>>(() => new Set());
  const prev = useRef(0);

  useEffect(() => {
    speak('Passa o sabonete!');
  }, []);

  useEffect(() => {
    if (clean.size > prev.current) playPop();
    prev.current = clean.size;
    if (clean.size >= SPOTS.length) succeedSoon(800);
  }, [clean.size, succeedSoon]);

  return (
    <GameFrame
      gameId="higiene"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Passa o sabonete!"
      happy={clean.size >= SPOTS.length}
      onBack={onBack}
    >
      <div className="basin">
        <div className="faucet" />
        <HandsArt />
        {SPOTS.map((spot) => (
          <div
            key={spot.id}
            className={clean.has(spot.id) ? 'spot clean' : 'spot'}
            data-spot={spot.id}
            style={{ left: spot.x, top: spot.y }}
            onPointerDown={() => {
              if (!clean.has(spot.id)) speak('Passa o sabonete!');
            }}
          >
            {clean.has(spot.id) ? <span className="foam-dot" /> : <Germ color={spot.color} />}
          </div>
        ))}
      </div>
      {clean.size >= SPOTS.length ? (
        <p className="foam-note">Mãos limpas!</p>
      ) : (
        <Draggable
          className="soap-wrap"
          label="Sabonete"
          onMove={(_point, el) => {
            const hits: string[] = [];
            for (const spot of SPOTS) {
              const node = document.querySelector(`[data-spot="${spot.id}"]`);
              if (node instanceof HTMLElement && overlaps(el, node)) hits.push(spot.id);
            }
            if (!hits.length) return;
            setClean((current) => {
              const next = new Set(current);
              let added = false;
              for (const id of hits) {
                if (!next.has(id)) {
                  next.add(id);
                  added = true;
                }
              }
              return added ? next : current;
            });
          }}
        >
          <SoapBar />
        </Draggable>
      )}
    </GameFrame>
  );
}

function sequenceFor(seed: number): Zone[] {
  const rng = mulberry32(seed + 21);
  return Array.from({ length: 4 }, () => ZONES[Math.floor(rng() * ZONES.length)]!);
}

function Escova({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const sequence = useMemo(() => sequenceFor(roundKey), [roundKey]);
  const [step, setStep] = useState(0);
  const [shake, setShake] = useState('');

  useEffect(() => {
    speak('Toca a luz da escova!');
  }, []);

  useEffect(() => {
    playTick();
  }, [step]);

  const tap = (zone: Zone) => {
    if (done.current) return;
    if (zone !== sequence[step]) {
      setShake(zone);
      onMiss();
      return;
    }
    playPop();
    const next = step + 1;
    if (next >= sequence.length) {
      succeedSoon(600);
      setStep(next);
      return;
    }
    setStep(next);
  };

  const active = sequence[Math.min(step, sequence.length - 1)];

  return (
    <GameFrame
      gameId="higiene"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Toca a luz!"
      happy={step >= sequence.length}
      onBack={onBack}
    >
      <div className="mouth">
        <div className="brush-row">
          {ZONES.map((zone) => (
            <div key={zone} className="brush-cell">
              {active === zone && step < sequence.length ? <Brush /> : null}
            </div>
          ))}
        </div>
        <div className="tooth-row">
          {ZONES.map((zone) => (
            <button
              key={`${zone}-${active === zone ? step : 'off'}`}
              className={`tooth${active === zone && step < sequence.length ? ' on' : ''}${shake === zone ? ' shake' : ''}`}
              aria-label="Dente"
              onClick={() => tap(zone)}
              onAnimationEnd={() => setShake('')}
            />
          ))}
        </div>
      </div>
    </GameFrame>
  );
}

function Brinquedos({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const toys = useMemo(() => shuffle(TOYS, roundKey + 4), [roundKey]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [clock, setClock] = useState(0);
  const [shake, setShake] = useState('');

  useEffect(() => {
    speak('Guarda na caixa da cor!');
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (done.current) return;
      speak('Sem pressa!');
      setClock((value) => value + 1);
    }, 28000);
    return () => window.clearTimeout(timer);
  }, [clock, done]);

  const park = (toy: (typeof TOYS)[number], point: { x: number; y: number; distance: number }) => {
    if (done.current) return false;
    const zone = dropId(point.x, point.y);
    if (!zone) return false;
    if (zone !== toy.color) {
      setShake(toy.id);
      onMiss();
      return false;
    }
    const next = [...placed, toy.id];
    setPlaced(next);
    playPop();
    if (next.length === TOYS.length) succeedSoon(700);
    return true;
  };

  return (
    <GameFrame
      gameId="higiene"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Guarda na caixa da cor!"
      happy={placed.length === TOYS.length}
      onBack={onBack}
    >
      <div className="timer" key={clock} aria-hidden="true"><i /></div>
      <div className="box-row">
        {BOXES.map((box) => {
          const toy = TOYS.find((item) => item.color === box.id && placed.includes(item.id));
          return (
            <div key={box.id} className="box" data-drop={box.id} style={{ background: box.hex }} aria-label={box.label}>
              {toy ? <Toy id={toy.id} /> : null}
            </div>
          );
        })}
      </div>
      <div className="toy-row">
        {toys.filter((toy) => !placed.includes(toy.id)).map((toy) => (
          <Draggable
            key={toy.id}
            className={shake === toy.id ? 'toy-card shake' : 'toy-card'}
            label={toy.label}
            onDrop={(point) => park(toy, point)}
          >
            <Toy id={toy.id} />
          </Draggable>
        ))}
      </div>
    </GameFrame>
  );
}

const BATH = [
  { id: 'molhar', label: 'Molhar', say: 'Primeiro molha!' },
  { id: 'sabao', label: 'Sabão', say: 'Agora o sabão!' },
  { id: 'enxagua', label: 'Água', say: 'Agora enxágua!' },
] as const;

function Banho({ level, streak, stars, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const [step, setStep] = useState(0);
  const [shake, setShake] = useState('');
  const current = BATH[Math.min(step, BATH.length - 1)]!;

  useEffect(() => {
    speak(current.say);
  }, [current.say]);

  const tap = (id: string) => {
    if (done.current) return;
    if (id !== current.id) {
      setShake(id);
      onMiss();
      return;
    }
    playPop();
    const next = step + 1;
    if (next >= BATH.length) {
      setStep(next);
      succeedSoon(700);
      return;
    }
    setStep(next);
  };

  const tub = step === 0 ? 'tub' : step === 1 ? 'tub wet' : step === 2 ? 'tub soapy' : 'tub clean';

  return (
    <GameFrame
      gameId="higiene"
      level={level}
      streak={streak}
      stars={stars}
      prompt={current.label}
      happy={step >= BATH.length}
      onBack={onBack}
    >
      <div className={tub} />
      <div className="bath-row">
        {BATH.map((item, index) => (
          <button
            key={item.id}
            className={`bath-step${index === step ? ' now' : ''}${index < step ? ' done' : ''}${shake === item.id ? ' shake' : ''}`}
            onClick={() => tap(item.id)}
            aria-label={item.label}
            onAnimationEnd={() => setShake('')}
          >
            <span className={`bath-icon ${item.id}`} />
            <small>{item.label}</small>
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

const MOMENTS = [
  { id: 'brincar', label: 'Brincar', tone: '#7dce63' },
  { id: 'comer', label: 'Comer', tone: '#ffb703' },
  { id: 'dormir', label: 'Dormir', tone: '#7c5cff' },
] as const;

function Rotina({ level, streak, stars, roundKey, onSuccess, onMiss, onBack }: GameProps) {
  const { done, succeedSoon } = useRoundEnd(onSuccess);
  const scenes = useMemo(() => shuffle(MOMENTS, roundKey + 5), [roundKey]);
  const [shake, setShake] = useState('');
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    speak('Quando a gente lava as mãos?');
  }, []);

  const tap = (id: string) => {
    if (done.current) return;
    if (id !== 'comer') {
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
      gameId="higiene"
      level={level}
      streak={streak}
      stars={stars}
      prompt="Antes de comer!"
      happy={happy}
      onBack={onBack}
    >
      <div className="routine-row">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            className={shake === scene.id ? 'routine-card shake' : 'routine-card'}
            style={{ background: scene.tone }}
            onClick={() => tap(scene.id)}
            aria-label={scene.label}
            onAnimationEnd={() => setShake('')}
          >
            <span className={`moment ${scene.id}`} />
            <span>{scene.label}</span>
          </button>
        ))}
      </div>
    </GameFrame>
  );
}
