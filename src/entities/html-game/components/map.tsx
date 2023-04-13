import styles from '../styles/html-game.module.scss';
import map from '@assets/map.svg';

export function Map() {
  return <img className={styles.map} src={map} />;
}
