import { setComputedStore, setEvent, setStore, redirect } from 're-event';
import { MarkerTypes } from '@entities/html-game';
import { MODALS_CONFIG, GAME_FINISHED_MODAL, Modal } from '@libs/rails-lib';
import { delay } from '@helpers/delay';
import { MarkersProgress, MarkersId, CoinsProgress } from '@api/signals';

// --> Маппит конфиг в удобоваримый вид Record<string, object> для поиска модалки по ключу.
const mappedModalConfig = MODALS_CONFIG.map(element => ({ id: element.id, data: element })).reduce(
  (prev: Record<string, typeof curr.data>, curr) => {
    prev[curr.id] = curr.data;
    return prev;
  },
  {}
);

export function createModel() {
  const markersSignal = MarkersId.use();
  const progressSignal = MarkersProgress.use();
  const coinsProgress = CoinsProgress.use();
  handleUpdateProgress();

  const closeModal = markersSignal.clear;
  const clearCompletedModals = setEvent<void>();
  const addModalId = setEvent<MarkerTypes>();
  const addCustomModal = setEvent<Modal>();

  function handleUpdateProgress(value = 0) {
    progressSignal.send({ current: value, count: MODALS_CONFIG.length });
  }

  /** Стор, содержащий список просмотренных модалок. */
  const completedModalIds = setStore<MarkerTypes[]>([])
    .on(addModalId, (modalIds, payload) => {
      if (!modalIds.includes(payload)) {
        return [...modalIds, payload];
      }

      return modalIds;
    })
    .watch(completed => handleUpdateProgress(completed.length))
    .clear(clearCompletedModals);

  /**
   * Стор с информацией о текущем модальном окне.
   * --> Сеттит информацию в completedModalIds при просмотре модального окна.
   * */
  const currentModalStore = setComputedStore({
    store: markersSignal.store,
    condition: id => !completedModalIds.getState().includes(id as MarkerTypes),
    transform: id => mappedModalConfig[id],
  })
    .on(addCustomModal, (_, payload) => payload)
    .watch(modal => modal?.id && addModalId(modal.id as MarkerTypes));

  /**
   * Стор с информацией о завершенной игре.
   * --> Скорее выглядит как костыль и требует доработки со стороны re-event.
   * */
  const isGameFinished = setStore(false)
    .on(closeModal, () => {
      const completedModalsLength = completedModalIds.getState().length;
      const allModalsLength = MODALS_CONFIG.length;

      return completedModalsLength === allModalsLength;
    })
    .watch(
      isFinished => isFinished && addCustomModal(GAME_FINISHED_MODAL({ coinsProgress: coinsProgress.store.getState() }))
    );

  return {
    closeModal,
    clearCompletedModals,
    currentModalStore,
    completedModalIds,
  };
}

export type ShowModalModel = ReturnType<typeof createModel>;
