import { useStore } from 're-event-flow';
import { HtmlGameModel } from '@entities/html-game/model';
import * as Styled from './styled';
import { InventoryModal } from './inventory-modal';

interface InventoryProps {
  model: HtmlGameModel;
}

export const Inventory = ({ model }: InventoryProps) => {
  const isOpenInventoryModal = useStore(model.isOpenInventoryModal);
  const currentUserInventory = useStore(model.currentUserInventory);

  return (
    <>
      <Styled.BagIcon onClick={() => model.setIsOpenInventoryModal(true)}>
        <p>I</p>
      </Styled.BagIcon>
      <InventoryModal
        handleUseItemFromInventory={model.handleUseItemFromInventory}
        isShowModal={isOpenInventoryModal}
        setIsShowModal={model.setIsOpenInventoryModal}
        currentUserInventory={currentUserInventory}
      />
    </>
  );
};
