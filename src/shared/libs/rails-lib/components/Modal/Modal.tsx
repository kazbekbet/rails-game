import React from 'react';
import { createPortal } from 'react-dom';
import root from 'react-shadow/styled-components';
import { Button, Overlay } from '../../styled/common';
import { GlobalStyle } from '../../styled/global';
import { ModalBody, ModalContainer, ModalFooter, ModalHeader } from './styled';
// eslint-disable-next-line no-restricted-syntax
import './web-components';

type TProps = {
  children: React.ReactElement | React.ReactElement[];
  isVisible?: boolean;
  onClose?: () => void;
  title: string | React.ReactElement;
};

export const Modal: React.FC<TProps> = ({ children, isVisible, onClose, title }) =>
  isVisible
    ? createPortal(
        // @ts-ignore
        <root.dialogModal>
          <ModalView title={title} children={children} onClose={onClose} isVisible />
        </root.dialogModal>,
        document.body
      )
    : null;

export const ModalView: React.FC<TProps> = ({ children, isVisible, onClose, title }) =>
  isVisible ? (
    <>
      <GlobalStyle />
      <Overlay>
        <ModalContainer>
          <ModalHeader>
            <h2>{title}</h2>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContainer>
      </Overlay>
    </>
  ) : null;
