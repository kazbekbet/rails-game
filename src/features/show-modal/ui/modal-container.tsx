import * as model from '../model';
import { useStore } from 're-event';
import { ModalView } from '@libs/rails-lib';

export function ModalContainer() {
  const signal = useStore(model.signalStore);
  const isModalId = useStore(model.isModalIdStore);
  const currentModal = useStore(model.currentModalStore);

  return (
    <>
      {currentModal && (
        <ModalView title={currentModal.title} isVisible={isModalId} onClose={model.closeModal}>
          {currentModal.children}
        </ModalView>
      )}
    </>
  );
}
