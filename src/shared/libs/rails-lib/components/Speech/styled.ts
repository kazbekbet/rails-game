import styled from 'styled-components';
import { C_WHITE } from '../../constants/colors';

type TDialogLineProps = {
  hasBlink: boolean;
};

export const DialogLine = styled.h3`
  will-change: width;
  color: ${C_WHITE};
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Noto Sans Mono';
  display: inline-flex;

  &::after {
    content: '';
    display: ${(props: TDialogLineProps) => (props.hasBlink ? 'block' : 'none')};
    height: 100%;
    width: 2px;
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
