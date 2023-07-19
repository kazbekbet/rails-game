import styled from 'styled-components';
import { C_WHITE } from '../../constants/colors';

export const DescriptionTooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${C_WHITE};

  p {
    margin: 5px 0;
  }
`;

export const DescriptionText = styled.div`
  font-style: italic;
`;
