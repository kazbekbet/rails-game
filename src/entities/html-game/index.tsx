import styles from './styles/html-game.module.scss';
import { useEffect, useRef } from 'react';
import { Markers } from '@entities/html-game/components/markers';
import { Map } from '@entities/html-game/components/map';
import { Player, Player1 } from '@entities/html-game/components/player';
import { Walls } from '@entities/html-game/components/walls';
import { PlayerAnimation } from '@entities/html-game/components/player-animation';
import * as model from '@entities/html-game/model';
import { useKeysSubscription } from '@entities/html-game/utils/use-keys-subscription';
import { useWallsRects } from '@entities/html-game/utils/use-walls-dom-rects';
import { usePlayerRect } from '@entities/html-game/utils/use-player-rect';

export function HtmlGame() {
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
      <Markers />
      <Player1 ref={playerRef}>
        <PlayerAnimation />
      </Player1>
      <Walls ref={wallsRef} />
    </div>
  );
}
