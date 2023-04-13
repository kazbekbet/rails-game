import { createContext } from 'react';
import { INITIAL_STATE } from './constants';
import { TModalContext } from './types';

/**
 * Контекст модалок.
 */
export const ModalContext = createContext<TModalContext>(INITIAL_STATE);
