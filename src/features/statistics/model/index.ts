import { setEvent, setStore } from 're-event-flow';
import { CoinsCollectNotifier, MarkersProgress, CoinsProgress } from '@api/signals';

export type StatisticsModel = ReturnType<typeof createModel>;

export function createModel() {
  const markersProgressSignal = MarkersProgress.use();
  const coinsCollectSignal = CoinsCollectNotifier.use();
  const coinsProgress = CoinsProgress.use();

  const incrementCoin = setEvent<number>();
  const coinsProgressStore = setStore(0)
    .on(incrementCoin, state => state + 1)
    .watch(coinsProgress.send);

  coinsCollectSignal.store.watch(incrementCoin);

  return {
    markersProgressStore: markersProgressSignal.store,
    coinsProgressStore,
  };
}
