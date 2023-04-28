import { ModalContainer } from './ui/modal-container';
import { createPortal } from 'react-dom';
import { createModel } from '../show-modal/model';
import { useMemo } from 'react';

const modalElement = document.getElementById('modal') as HTMLElement;

export function ModalWindow() {
  const model = useMemo(createModel, []);

  return (
    <>
      {createPortal(
        <>
          <ModalContainer model={model} />
        </>,
        modalElement
      )}
    </>
  );
}
