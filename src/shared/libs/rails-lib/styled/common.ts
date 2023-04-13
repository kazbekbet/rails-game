import styled from 'styled-components';
import { C_OVERLAY_50, C_PRIMARY, C_WHITE } from '../constants/colors';

export const Overlay = styled.div`
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
  background-color: ${C_OVERLAY_50};
  backdrop-filter: blur(7px);
`;

export const Button = styled.button`
  padding: .5rem .75rem;
  background-color: ${props => props.color || C_PRIMARY};
  border: 1px solid ${props => props.color || C_PRIMARY};
  border-radius: 2rem;
  color: ${C_WHITE};
  cursor: pointer;
  transition: background-color .25s, border-color .25s, color .25s;

  &:hover {
    background-color: ${C_WHITE};
    border-color: ${C_WHITE};
    color: ${props => props.color || C_PRIMARY};
  }
`;
