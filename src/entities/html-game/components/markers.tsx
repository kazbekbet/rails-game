import mainMarker from '@assets/markers/main.svg';
import classNames from "classnames";
import styles from '../styles/html-game.module.scss';

export function Markers() {
  return (
    <>
      <img
        id="hr"
        src={mainMarker}
        className={classNames(styles.marker, styles.marker1)}
      />
      <img
        id="marketing"
        src={mainMarker}
        className={classNames(styles.marker, styles.marker2)}
      />
      <img
        id="sw"
        src={mainMarker}
        className={classNames(styles.marker, styles.marker3)}
      />
      <img
        id="teamlead"
        src={mainMarker}
        className={classNames(styles.marker, styles.marker4)}
      />
    </>
  );
}
