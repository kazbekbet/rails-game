import { ModalContainer } from './ui/modal-container';
import { createPortal } from 'react-dom';
import { ModalCounter } from '@features/show-modal/ui/modal-counter';
import { createModel } from '../show-modal/model';
import { useMemo } from 'react';

const modalElement = document.getElementById('modal') as HTMLElement;

export function ModalWindow() {
  const model = useMemo(createModel, []);

  return (
    <>
      {createPortal(
        <>
          <ModalCounter model={model} />
          <ModalContainer model={model} />
        </>,
        modalElement
      )}
    </>
  );
}
