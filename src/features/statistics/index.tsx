import { Meetings } from './ui/meetings';
import styles from './styles/statistics.module.scss';
import { useMemo } from 'react';
import { createModel } from '@features/statistics/model';
import {CoinsProgress} from "@features/statistics/ui/coins-progress";

export function Statistics() {
  const model = useMemo(createModel, []);

  return (
    <div className={styles.statisticsContainer}>
      <CoinsProgress model={model} />
      <Meetings model={model} />
    </div>
  );
}
