import styles from '../styles/html-game.module.scss';
import walls from '@assets/walls.svg';
import { Ref, forwardRef, ForwardedRef } from 'react';

export const Walls = forwardRef((_, ref: ForwardedRef<HTMLObjectElement>) => (
  <object id="walls" ref={ref} className={styles.walls} data={walls}></object>
));
