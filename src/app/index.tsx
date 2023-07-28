import { HtmlGame } from '@entities/html-game';
import { ModalWindow } from '@features/show-modal';
import { GameContainer } from '@containers/game-container';
import { CoinsCollectNotifier, MarkersId, MarkersProgress, CoinsProgress, PlayerInputAction } from '@api/signals';

MarkersId.init();
MarkersProgress.init();
CoinsCollectNotifier.init();
CoinsProgress.init();
PlayerInputAction.init();

function App() {
  return (
    <>
      <GameContainer />
      <ModalWindow />
    </>
  );
}

export default App;
