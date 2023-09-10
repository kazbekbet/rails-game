import cn from 'classnames';
import styles from '../styles/statistics.module.scss';
import { StatisticsModel } from '../model';
import { useStore } from 're-event-flow';

export function Meetings({ model }: { model: StatisticsModel }) {
  return (
    <div className={cn(styles.meetings, styles.container)}>
      <p className={cn(styles.meetings, styles.label)}>Знакомств с коллегами: </p>
      <div>
        <h2 className={cn(styles.meetings, styles.progress)}>
          <Counter model={model} />
        </h2>
      </div>
    </div>
  );
}

function Counter({ model }: { model: StatisticsModel }) {
  const { count, current } = useStore(model.markersProgressStore);

  return (
    <>
      {current} из {count}
    </>
  );
}
