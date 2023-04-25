import styles from './styles/html-game.module.scss';
import { useEffect, useMemo, useRef } from 'react';
import { Markers } from '@entities/html-game/components/markers';
import { Map } from '@entities/html-game/components/map';
import { Player } from '@entities/html-game/components/player';
import { Walls } from '@entities/html-game/components/walls';
import { createModel } from '@entities/html-game/model';
import { useKeysSubscription } from '@entities/html-game/utils/use-keys-subscription';
import { useWallsRects } from '@entities/html-game/utils/use-walls-dom-rects';
import { usePlayerRect } from '@entities/html-game/utils/use-player-rect';
import { MarkerTypes } from './interfaces';

function HtmlGame() {
  const model = useMemo(createModel, []);

  const wallsRef = useRef<HTMLObjectElement>(null);
  const playerRef = useRef<HTMLObjectElement>(null);

  useKeysSubscription({
    onKeyDown: model.handleKeyDown,
    onKeyUp: model.handleKeyUp,
    wallsRef,
  });

  usePlayerRect({
    onSetRects: model.handleSetPlayerInitialInfo,
    playerRef,
  });

  useWallsRects({
    onSetRects: model.handleSetWallsRects,
    wallsRef,
  });

  return (
    <div className={styles.app}>
      <Map />
      <Markers model={model} />
      <Player ref={playerRef} model={model} />
      <Walls ref={wallsRef} model={model} />
    </div>
  );
}

export { HtmlGame, MarkerTypes };
