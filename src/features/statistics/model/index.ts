import { setStore } from 're-event';
import { MarkersProgress } from '@api/signals';

export type StatisticsModel = ReturnType<typeof createModel>;

export function createModel() {
  const markersProgressSignal = MarkersProgress.use();

  return {
    markersProgressStore: markersProgressSignal.store,
  };
}
