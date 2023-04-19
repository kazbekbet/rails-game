import { ModalContainer } from './ui/modal-container';
import { createPortal } from 'react-dom';

const modalElement = document.getElementById('modal') as HTMLElement;
export const attachModal = createPortal(<ModalContainer />, modalElement);
