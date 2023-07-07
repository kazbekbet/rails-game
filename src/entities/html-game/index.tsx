import styles from './styles/html-game.module.scss';
import { useEffect, useMemo, useRef } from 'react';
import { CharactersMap } from '@entities/html-game/components/characters';
import { Map } from '@entities/html-game/components/map';
import { Player } from '@entities/html-game/components/player';
import { Walls } from '@entities/html-game/components/walls';
import { createModel } from '@entities/html-game/model';
import { useKeysSubscription } from '@entities/html-game/utils/use-keys-subscription';
import { useInvisibleRects } from '@entities/html-game/utils/use-invisible-rects';
import { usePlayerRect } from '@entities/html-game/utils/use-player-rect';
import { MarkerTypes } from './interfaces';
import { CoinsMap } from '@entities/html-game/components/coins-map';

function HtmlGame() {
  const model = useMemo(createModel, []);

  const wallsRef = useRef<HTMLObjectElement>(null);
  const coinsMapRef = useRef<HTMLObjectElement>(null);
  const playerRef = useRef<HTMLObjectElement>(null);
  const charactersRef = useRef<HTMLObjectElement>(null);

  useKeysSubscription({
    onKeyDown: model.handleKeyDown,
    onKeyUp: model.handleKeyUp,
    wallsRef,
  });

  usePlayerRect({
    onSetRects: model.handleSetPlayerInitialInfo,
    playerRef,
  });

  useInvisibleRects({
    onSetRects: model.handleSetWallsRects,
    ref: wallsRef,
  });

  useInvisibleRects({
    onSetRects: model.handleSetCoinsRects,
    ref: coinsMapRef,
  });

  useInvisibleRects({
    onSetRects: model.handleSetCharactersRects,
    ref: charactersRef,
  });

  return (
    <div className={styles.app}>
      <CoinsMap model={model} ref={coinsMapRef} />
      <Map />
      <Player ref={playerRef} model={model} />
      <Walls ref={wallsRef} model={model} />
      <CharactersMap ref={charactersRef} model={model} />
    </div>
  );
}

export { HtmlGame, MarkerTypes };
