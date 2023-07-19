import { createPortal } from 'react-dom';
import { FC, useMemo, useState } from 'react';
import { useStore } from 're-event';
import { HtmlGameModel } from '@entities/html-game/model';
import { IPlayerEquipment, ItemIdType } from '@entities/html-game/interfaces';
import laptopIcon from '@assets/icons/inventory/laptop-icon.svg';
import { Modal } from '@shared/libs/rails-lib/components/ModalContainer';
import { DescriptionTooltip } from '@shared/libs/rails-lib/components';
import { PlayerInputAction } from '@api/signals';
import * as Styled from './styled';

const columnsCount = 5;
const rowsCount = 5;

const fillersSize = columnsCount * rowsCount;

const filers = Array(fillersSize).fill(0);

const imagesForKeys: { [key in ItemIdType]: string } = {
  notebook: laptopIcon,
};

interface IInventory {
  model: HtmlGameModel;
}

const Inventory: FC<IInventory> = ({ model }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const currentUserInventory = useStore(model.currentUserInventory);
  const playerInputActionSignal = PlayerInputAction.use();

  playerInputActionSignal.store.watch(val => {
    if (val === 'inventory') {
      setIsShowModal(isOpen => !isOpen);
    }
  });

  return (
    <>
      <Styled.BagIcon onClick={() => setIsShowModal(true)}>
        <p>I</p>
      </Styled.BagIcon>
      <InventoryModal
        handleUseItemFromInventory={model.handleUseItemFromInventory}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        currentUserInventory={currentUserInventory}
      />
    </>
  );
};

export default Inventory;

interface IInventoryModal {
  isShowModal: boolean;
  currentUserInventory: IPlayerEquipment[];
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleUseItemFromInventory: (value: IPlayerEquipment) => void;
}

const InventoryModal: FC<IInventoryModal> = ({
  isShowModal,
  currentUserInventory,
  setIsShowModal,
  handleUseItemFromInventory,
}) => {
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
