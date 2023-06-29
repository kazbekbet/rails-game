import { registerSignal, useSignal } from '@libs/signal';

export namespace MarkersId {
  export type Dto = string;
  export const alias = 'MarkersId';

  export function init() {
    registerSignal<Dto>(alias, '');
  }

  export function use() {
    return useSignal<Dto>(alias);
  }

  export function watchHistory() {
    const { historyStore } = useSignal<Dto>(alias);
    historyStore.watch(history => console.log(`💥 Signal: ${alias}`, history));
  }
}

export namespace MarkersProgress {
  export type Dto = { current: number; count: number };
  export const alias = 'MarkersProgress';

  export function init() {
    registerSignal<Dto>(alias, { current: 0, count: 0 });
  }

  export function use() {
    return useSignal<Dto>(alias);
  }

  export function watchHistory() {
    const { historyStore } = useSignal<Dto>(alias);
    historyStore.watch(history => console.log(`💥 Signal: ${alias}`, history));
  }
}

export namespace CoinsProgress {
  export const alias = 'CoinsProgress';

  export function init() {
    registerSignal<number>(alias, 0);
  }

  export function use() {
    return useSignal<number>(alias);
  }

  export function watchHistory() {
    const { historyStore } = useSignal<number>(alias);
    historyStore.watch(history => console.log(`💥 Signal: ${alias}`, history));
  }
}
