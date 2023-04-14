import map from '@assets/map.svg';
import styles from '../styles/html-game.module.scss';

export function Map() {
  return <img className={styles.map} src={map} />;
}
