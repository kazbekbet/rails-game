import { ModalContainer } from './ui/modal-container';
import { createPortal } from 'react-dom';

const modalElement = document.getElementById('modal') as HTMLElement;

export function ModalWindow() {
  return <>{createPortal(<ModalContainer />, modalElement)}</>;
}
