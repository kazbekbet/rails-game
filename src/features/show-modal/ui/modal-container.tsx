import * as model from '../model';
import { useStore } from 're-event';
import { ModalView } from '@libs/rails-lib';
import { ModalCounter } from '@features/show-modal/ui/modal-counter';
import { ShowModalModel } from '../model';

export function ModalContainer({ model }: { model: ShowModalModel }) {
  const currentModal = useStore(model.currentModalStore);

  return (
    <>
      {currentModal && (
        <ModalView
          title={currentModal.title}
          isVisible={true}
          customFooter={currentModal.customFooter}
          onClose={model.closeModal}
        >
          {currentModal.children}
        </ModalView>
      )}
    </>
  );
}
