import cn from 'classnames';
import styles from '../styles/statistics.module.scss';

export function Meetings() {
  return (
    <div className={cn(styles.meetings, styles.container)}>
      <p className={cn(styles.meetings, styles.label)}>Знакомств с коллегами: </p>
      <div>
        <h2 className={cn(styles.meetings, styles.progress)}>
          <Counter /> из {12}
        </h2>
      </div>
    </div>
  );
}

function Counter() {

  return <>{5}</>;
}
