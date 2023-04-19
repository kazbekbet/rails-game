import { signal } from '@libs/signal';
import { setComputedStore } from 're-event';
import { MarkerTypes } from '@entities/html-game';
import { MODALS_CONFIG } from '@libs/rails-lib';

// --> Маппит конфиг в удобоваримый вид Record<string, object> для поиска модалки по ключу.
const mappedModalConfig = MODALS_CONFIG.map(element => ({ id: element.id, data: element })).reduce(
  (prev: Record<string, typeof curr.data>, curr) => {
    prev[curr.id] = curr.data;
    return prev;
  },
  {}
);

export const closeModal = signal.clear;

export const signalStore = setComputedStore({
  store: signal.store,
});

export const isModalIdStore = setComputedStore({
  store: signalStore,
  transform: id => Object.values(MarkerTypes).includes(id as MarkerTypes),
});

export const currentModalStore = setComputedStore({
  store: signalStore,
  transform: id => mappedModalConfig[id],
});
