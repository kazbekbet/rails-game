import styled, { css } from 'styled-components';
import bagIcon from '@assets/icons/inventory/bag-icon.svg';
import { C_BORDER_GRAY, C_PRIMARY, C_WHITE } from '@shared/libs/rails-lib/constants/colors';

export const BagIcon = styled.div`
  background: url(${bagIcon});
  width: 64px;
  height: 64px;
  position: absolute;
  left: 100px;
  cursor: pointer;
  bottom: 60px;
  background-size: cover;
  transition: transform 0.25s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }

  p {
    position: relative;
    top: 50px;
    font-size: 28px;
    font-weight: bold;
    color: ${C_PRIMARY};
  }
`;

const ItemBase = css`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 2px solid ${C_BORDER_GRAY};
`;

export const InventoryModal = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 64px);
  grid-template-rows: repeat(5, 64px);
  gap: 10px;
`;

export const FillerItem = styled.div`
  ${ItemBase};
`;

export const InventoryItem = styled.img<{ isCanUseItem: boolean }>`
  ${ItemBase};

  ${p =>
    p.isCanUseItem &&
    `border: 2px solid ${C_WHITE};
       &:hover {
         cursor: pointer;
         border: 2px solid ${C_PRIMARY};
       }`}
`;
