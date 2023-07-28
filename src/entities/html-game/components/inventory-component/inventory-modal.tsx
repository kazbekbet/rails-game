import { createPortal } from 'react-dom';
import { useMemo } from 'react';
import { ItemIdType, PlayerEquipment } from '@entities/html-game/interfaces';
import { Modal } from '@shared/libs/rails-lib/components/ModalContainer';
import { DescriptionTooltip } from '@shared/libs/rails-lib/components';
import laptopIcon from '@assets/icons/inventory/laptop-icon.svg';
import * as Styled from './styled';

const imagesForKeys: { [key in ItemIdType]: string } = {
  notebook: laptopIcon,
};

const columnsCount = 5;
const rowsCount = 5;

const fillersSize = columnsCount * rowsCount;

const filers = Array(fillersSize).fill(0);

interface InventoryModalProps {
  isShowModal: boolean;
  currentUserInventory: PlayerEquipment[];
  setIsShowModal: (value: boolean) => void;
  handleUseItemFromInventory: (value: PlayerEquipment) => void;
}
export const InventoryModal = ({
  isShowModal,
  currentUserInventory,
  setIsShowModal,
  handleUseItemFromInventory,
}: InventoryModalProps) => {
  const fillers = useMemo(() => {
    return [...filers].slice(0, fillersSize - currentUserInventory.length);
  }, [currentUserInventory]);

  return isShowModal
    ? createPortal(
        <Modal.ModalOverlay onCloseModal={() => setIsShowModal(false)}>
          <Modal.ModalContainer>
            <Modal.ModalTitle>Инвентарь</Modal.ModalTitle>
            <Styled.InventoryModal>
              {currentUserInventory.map(item => (
                <div key={item.id}>
                  <DescriptionTooltip
                    id={item.id}
                    title={item.title}
                    description={item.description}
                  ></DescriptionTooltip>
                  <Styled.InventoryItem
                    onClick={() => item.isCanUse && handleUseItemFromInventory(item)}
                    isCanUseItem={item.isCanUse}
                    data-tooltip-id={item.id}
                    src={imagesForKeys[item.id]}
                  />
                </div>
              ))}
              {fillers.map((_, index) => (
                <Styled.FillerItem key={index} />
              ))}
            </Styled.InventoryModal>
          </Modal.ModalContainer>
        </Modal.ModalOverlay>,
        document.getElementById('inventory')!
      )
    : null;
};
