import { useEffect, useRef, useState } from 'react';
import { hush, playJingle, playPop, speak, unlockAudio } from './audio';
import { Album } from './components/Album';
import { Hub } from './components/Hub';
import { Splash } from './components/Splash';
import { Victory } from './components/Victory';
import { World } from './components/World';
import { JogoEscolinha } from './games/Escolinha';
import { JogoHigiene } from './games/Higiene';
import { JogoMissionario } from './games/Missionario';
import { awardRound, registerMiss } from './progress';
import { loadState, saveState } from './storage';
import type { GameId, Screen, VictoryInfo } from './types';

export function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [state, setState] = useState(loadState);
  const [roundKey, setRoundKey] = useState(0);
  const [victory, setVictory] = useState<VictoryInfo | null>(null);
  const stateRef = useRef(state);
  const screenRef = useRef(screen);
  const greeted = useRef(false);
  const missAt = useRef(0);
  stateRef.current = state;
  screenRef.current = screen;

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    playJingle();
    const onPointer = () => {
      unlockAudio();
      const where = screenRef.current;
      if (where === 'splash' || where === 'hub') playJingle();
    };
    window.addEventListener('pointerdown', onPointer);
    return () => window.removeEventListener('pointerdown', onPointer);
  }, []);

  useEffect(() => {
    if (screen !== 'hub' || greeted.current) return;
    greeted.current = true;
    const timer = window.setTimeout(() => speak('Olá! Vamos brincar?'), 350);
    return () => window.clearTimeout(timer);
  }, [screen]);

  const goHub = () => {
    hush();
    setVictory(null);
    setScreen('hub');
  };

  const openGame = (gameId: GameId) => {
    unlockAudio();
    playPop();
    setRoundKey((value) => value + 1);
    setScreen(gameId);
  };

  const succeed = (gameId: GameId) => {
    const award = awardRound(stateRef.current, gameId);
    setState(award.state);
    setVictory({
      gameId,
      leveledUp: award.leveledUp,
      gameComplete: award.gameComplete,
      stickerId: award.stickerId,
      isNew: award.isNew,
      levelBefore: award.levelBefore,
    });
    setScreen('victory');
  };

  const miss = (gameId: GameId) => {
    const now = Date.now();
    if (now - missAt.current < 800) return;
    missAt.current = now;
    setState(registerMiss(stateRef.current, gameId));
    speak('Quase! Vamos tentar de novo, campeão!');
  };

  const replay = () => {
    if (!victory) return;
    const gameId = victory.gameId;
    setRoundKey((value) => value + 1);
    setVictory(null);
    setScreen(gameId);
  };

  const gameProps = (gameId: GameId) => ({
    level: state.games[gameId].currentLevel,
    streak: state.games[gameId].winStreak,
    stars: state.totalStars,
    roundKey,
    onSuccess: () => succeed(gameId),
    onMiss: () => miss(gameId),
    onBack: goHub,
  });

  return (
    <div className="app" onContextMenu={(event) => event.preventDefault()}>
      {(screen === 'splash' || screen === 'hub' || screen === 'album') && <World />}
      {screen === 'splash' && <Splash onDone={() => setScreen('hub')} />}
      {screen === 'hub' && <Hub state={state} onOpen={openGame} onAlbum={() => setScreen('album')} />}
      {screen === 'album' && <Album state={state} onBack={goHub} />}
      {screen === 'missionario' && <JogoMissionario key={roundKey} {...gameProps('missionario')} />}
      {screen === 'escolinha' && <JogoEscolinha key={roundKey} {...gameProps('escolinha')} />}
      {screen === 'higiene' && <JogoHigiene key={roundKey} {...gameProps('higiene')} />}
      {screen === 'victory' && victory && (
        <Victory info={victory} onNext={replay} onHome={goHub} />
      )}
    </div>
  );
}
