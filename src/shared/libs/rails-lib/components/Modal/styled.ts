import styled from 'styled-components';
import { C_OVERLAY_25, C_SECONDARY } from '../../constants/colors';

export const ModalContainer = styled.div`
  max-width: 1200px;
  width: 80vw;
  display: grid;
  grid-template: "header" 5rem
    "body" auto
    "footer" 5rem / 100%;
  background-color: ${C_SECONDARY};
  border-radius: 2rem;
  box-shadow 0 0 1rem ${C_OVERLAY_25};
  animation: popup .25s ease;

  @keyframes popup {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled.header`
  grid-area: header;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid ${C_OVERLAY_25};
`;

export const ModalBody = styled.article`
  grid-area: body;
  width: 100%;
  max-height: 900px;
  height: 60vh;
  flex: 1 1 100%;
  padding: 2rem;
  border-bottom: 1px solid ${C_OVERLAY_25};

  & video {
    max-height: 500px;
    height: 100%;
    border-radius: 100px 50px;
  }
`;

export const ModalFooter = styled.footer`
  grid-area: footer;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;
