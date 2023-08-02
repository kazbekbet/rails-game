import { C_WHITE } from '@shared/libs/rails-lib/constants/colors';
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  background-color: #4b4040e1;
  border-radius: 10px;
`;

export const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: ${C_WHITE};
  font-size: 20px;
`;

export const CloseIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
