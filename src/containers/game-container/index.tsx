import { HtmlGame } from '@entities/html-game';
import styles from './game-container.module.scss';
import { Statistics } from '@features/statistics';

export function GameContainer() {
  return (
    <div className={styles.container}>
      <HtmlGame />
      <div className={styles.sideContainer}>
        <Statistics />
      </div>
    </div>
  );
}
