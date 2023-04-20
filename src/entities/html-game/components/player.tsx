import { useStore } from 're-event';
import * as model from '../model';
import { AllowedKeys } from '../constants';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';

export const Player = forwardRef((_, ref: ForwardedRef<HTMLObjectElement>) => {
  const playerStyle = useStore(model.playerStyleStore);
  const moveCssClass = useStore(model.moveCssClassStore);
  const isPlayerMoving = useStore(model.isPlayerMovingStore);

  const className = classNames(styles.player, moveCssClass, {
    [styles.move!]: isPlayerMoving,
  });

  return <div id="player" ref={ref} className={className} style={playerStyle} />;
});
