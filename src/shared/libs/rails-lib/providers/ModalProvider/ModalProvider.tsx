import React from 'react';
import { LOCKED_MODALS } from '../../constants/modals'
import { INITIAL_STATE } from './constants';
import { ModalContext } from './context';
import { TModalContextValues } from './types';

type TProps = {
  children: React.ReactNode;
};

/**
 * Провайдер контекста модалок.
 */
export const ModalProvider: React.FC<TProps> = ({ children }) => {
  const [modalState, setModalState] = React.useState<TModalContextValues>(INITIAL_STATE);

  const updateModalState = (newContext: Partial<TModalContextValues>): void => {
    setModalState(prevContext => ({ ...prevContext, ...newContext }));
  };

  const setModal = (modalId: string | undefined): void => {
    if (!modalId || !LOCKED_MODALS.has(modalId)) {
      let { modalsCount } = modalState;

      ++modalsCount;

      updateModalState({
        modalsCount,
        modalId,
      });

      if (modalId) LOCKED_MODALS.add(modalId);
    }
  };

  return (
    <ModalContext.Provider value={{
      ...modalState,
      setModal,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
};
