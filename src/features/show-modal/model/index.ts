import { signal } from '@libs/signal';
import { setComputedStore, setEvent, setStore, redirect } from 're-event';
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
export const clearCompletedModals = setEvent<void>();
const addModalId = setEvent<MarkerTypes>();

/** Стор, содержащий список просмотренных модалок. */
export const completedModalIds = setStore<MarkerTypes[]>([])
  .on(addModalId, (modalIds, payload) => {
    if (!modalIds.includes(payload)) {
      return [...modalIds, payload];
    }

    return modalIds;
  })
  .clear(clearCompletedModals);

/** Стор с информацией о текущем модальном окне. */
export const currentModalStore = setComputedStore({
  store: signal.store,
  condition: id => !completedModalIds.getState().includes(id as MarkerTypes),
  transform: id => mappedModalConfig[id],
}).watch(modal => modal?.id && addModalId(modal.id as MarkerTypes));
