import styles from '@entities/html-game/styles/html-game.module.scss';
import { useStore } from 're-event';
import * as model from '../model';
import { KEYS } from '../constants';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import classNames from 'classnames';

export function Player({ children }: { children: JSX.Element }) {
  const playerStyle = useStore(model.playerStyleStore);
  const moveCssClass = useStore(model.moveCssClassStore);
  const isPlayerMoving = useStore(model.isPlayerMovingStore);

  const className = classNames({
    [`${styles.player}`]: true,
    [`${moveCssClass}`]: true,
    // TODO: разобраться с анимацией
    // [`${styles.move}`]: isPlayerMoving,
  });

  return (
    <div id="player" className={className} style={playerStyle}>
      {children}
    </div>
  );
}

export const Player1 = forwardRef(({ children }: { children: JSX.Element }, ref: ForwardedRef<HTMLObjectElement>) => {
  const playerStyle = useStore(model.playerStyleStore);
  const moveCssClass = useStore(model.moveCssClassStore);
  const isPlayerMoving = useStore(model.isPlayerMovingStore);

  const className = classNames({
    [`${styles.player}`]: true,
    [`${moveCssClass}`]: true,
    // TODO: разобраться с анимацией
    // [`${styles.move}`]: isPlayerMoving,
  });

  return (
    <div id="player" ref={ref} className={className} style={playerStyle}>
      {children}
    </div>
  );
});
