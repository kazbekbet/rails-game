import styled from 'styled-components';
import { C_WHITE } from '../../constants/colors';

type TDialogLineProps = {
  length: number;
  time: number;
};

export const DialogLine = styled.h3`
  width: ${(props: TDialogLineProps) => props.length ?? 0}ch;
  animation: type ${(props: TDialogLineProps) => props.time ?? 0}s steps(${(props: TDialogLineProps) => props.length ?? 0});
  color: ${C_WHITE};
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Noto Sans Mono';
  display: inline-flex;

  @keyframes type {
    0% {
      width: 0ch;
    }
    
    100% {
      width: ${(props: TDialogLineProps) => props.length ?? 0}ch;
    }
  }
`;

export const Blink = styled.div`
  height: 100%;
  width: 1ch;
  animation: blink 1s linear infinite;
  border-right: 1ch solid ${C_WHITE};

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
