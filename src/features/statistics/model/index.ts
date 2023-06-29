import { setComputedStore, setEvent, setStore } from 're-event';
import { CoinsProgress, MarkersProgress } from '@api/signals';

export type StatisticsModel = ReturnType<typeof createModel>;

export function createModel() {
  const markersProgressSignal = MarkersProgress.use();
  const coinsProgressSignal = CoinsProgress.use();

  const incrementCoin = setEvent<number>();
  const coinsProgressStore = setStore(0).on(incrementCoin, state => state + 1);

  coinsProgressSignal.store.watch(incrementCoin);

  return {
    markersProgressStore: markersProgressSignal.store,
    coinsProgressStore,
  };
}
