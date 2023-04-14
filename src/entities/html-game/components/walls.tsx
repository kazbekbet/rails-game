import styles from '../styles/html-game.module.scss';
import walls from '@assets/walls.svg';
import { Ref, forwardRef, ForwardedRef } from 'react';
import { useStore } from 're-event';
import * as model from '../model';
import classNames from 'classnames';

export const Walls = forwardRef((_, ref: ForwardedRef<HTMLObjectElement>) => {
  const isWallsSetted = useStore(model.isWallsSettedStore);

  return (
    <object
      id="walls"
      ref={ref}
      className={styles.walls}
      // --> Костыль, который исправляет баг остановки передвижения после клика по документу.
      // По большому счёту нам больше не нужен object после того, как мы установили все стены в стор.
      style={{ display: isWallsSetted ? 'none' : 'block' }}
      data={walls}
    />
  );
});
