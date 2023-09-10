import cn from 'classnames';
import styles from '../styles/statistics.module.scss';
import { StatisticsModel } from '../model';
import { useStore } from 're-event-flow';
import coin from '@assets/coin.svg';

export function CoinsProgress({ model }: { model: StatisticsModel }) {
  return (
    <div className={cn(styles.coins, styles.container)}>
      <p className={cn(styles.coins, styles.label)}>Собрано монет: </p>
      <div>
        <h2 className={cn(styles.coins, styles.progress)}>
          <Counter model={model} />
          <img className={styles.coinImage} src={coin} />
        </h2>
      </div>
    </div>
  );
}

function Counter({ model }: { model: StatisticsModel }) {
  const count = useStore(model.coinsProgressStore);

  return (
    <>
      {count}
    </>
  );
}
