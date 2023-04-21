import * as model from '../model';
import { useStore } from 're-event';
import { ModalView } from '@libs/rails-lib';
import { ModalCounter } from '@features/show-modal/ui/modal-counter';

export function ModalContainer() {
  const currentModal = useStore(model.currentModalStore);

  return (
    <>
      {currentModal && (
        <ModalView title={currentModal.title} isVisible={true} onClose={model.closeModal}>
          {currentModal.children}
        </ModalView>
      )}
    </>
  );
}
