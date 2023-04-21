import { ModalContainer } from './ui/modal-container';
import { createPortal } from 'react-dom';
import { ModalCounter } from '@features/show-modal/ui/modal-counter';

const modalElement = document.getElementById('modal') as HTMLElement;

export function ModalWindow() {
  return (
    <>
      {createPortal(
        <>
          <ModalCounter />
          <ModalContainer />
        </>,
        modalElement
      )}
    </>
  );
}
