import React, { FC, useContext } from 'react';
import closeIcon from '@assets/icons/common/close-icon.svg';
import * as Styled from './styles';

interface IModalPropsBase {
  className?: string;
  children: React.ReactNode;
}

interface IModalOverlay extends IModalPropsBase {
  onCloseModal?: () => void;
}

interface IModalContainer extends IModalPropsBase {}

interface IModalContext {
  onCloseModal: () => void;
}

const ModalContext = React.createContext<IModalContext>({ onCloseModal: () => {} });

const useModalContext = () => React.useContext(ModalContext);

export const ModalOverlay: FC<IModalOverlay> = props => {
  const { onCloseModal = () => {} } = props;
  return (
    <Styled.ModalOverlay className={props.className} onClick={onCloseModal}>
      <ModalContext.Provider value={{ onCloseModal: onCloseModal }}>{props.children}</ModalContext.Provider>
    </Styled.ModalOverlay>
  );
};

export const ModalContainer: FC<IModalContainer> = props => {
  return (
    <Styled.ModalContainer className={props.className} onClick={event => event.stopPropagation()}>
      {props.children}
    </Styled.ModalContainer>
  );
};

interface IModalTitle extends IModalPropsBase {}

export const ModalTitle: FC<IModalTitle> = ({ children, className }) => {
  const { onCloseModal } = useModalContext();
  return (
    <Styled.ModalTitle className={className}>
      <div>{children}</div>
      <Styled.CloseIcon src={closeIcon} onClick={onCloseModal} />
    </Styled.ModalTitle>
  );
};
