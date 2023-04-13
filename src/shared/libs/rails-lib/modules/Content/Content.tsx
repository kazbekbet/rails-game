import React from 'react';
import { Modal } from '../../components'
import { LOCKED_MODALS, MODALS_CONFIG } from '../../constants/modals';
import { ModalContext, ModalProvider } from '../../providers';
import { GlobalStyle } from '../../styled/global';
import { populateWindow } from '../../utils/window';

export const Content = () => {
  const { modalId, setModal } = React.useContext(ModalContext);

  const handleModalClose = React.useCallback(() => {
    setModal?.(undefined);
  }, [setModal]);

  const openModal = (id: string) => {
    setModal?.(id);
  };

  const unlockModal = (id: string) => {
    LOCKED_MODALS.delete(id);
  };

  // так делать обычно совсем не стоит, но здесь нам нужен наиболее примитивный способ вызова нашего функционала
  populateWindow({
    openModal,
    unlockModal,
  });

  return (
    <>
      <GlobalStyle />
      <ModalProvider>
        {MODALS_CONFIG.map(({ children, id, title }) => (
          <Modal
            key={id}
            isVisible={id === modalId}
            onClose={handleModalClose}
            title={title}
          >
            {children}
          </Modal>
        ))}
      </ModalProvider>
    </>
  );
};
