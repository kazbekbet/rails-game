import { useStore } from 're-event-flow';
import { ModalView } from '@libs/rails-lib';
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
