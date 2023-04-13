import styles from "@entities/html-game/styles/html-game.module.scss";
import walkFrame0 from "@assets/animation/walk/frame_0.png";
import walkFrame1 from "@assets/animation/walk/frame_1.png";
import walkFrame2 from "@assets/animation/walk/frame_2.png";
import walkFrame3 from "@assets/animation/walk/frame_3.png";

export function PlayerAnimation() {
  return (
    <div id="player-animation-0" className={styles.playerMoveAnimation}>
      <div className={styles.animationFrame}>
        <img src={walkFrame0} />
      </div>
      <div className={styles.animationFrame}>
        <img src={walkFrame1} />
      </div>
      <div className={styles.animationFrame}>
        <img src={walkFrame2} />
      </div>
      <div className={styles.animationFrame}>
        <img src={walkFrame3} />
      </div>
    </div>
  );
}
