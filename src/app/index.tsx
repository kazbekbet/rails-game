import { HtmlGame } from '@entities/html-game';
import { ModalWindow } from '@features/show-modal';
import { GameContainer } from '@containers/game-container';
import { MarkersId, MarkersProgress } from '@api/signals';

MarkersId.init();
MarkersProgress.init();

function App() {
  return (
    <>
      <GameContainer />
      <ModalWindow />
    </>
  );
}

export default App;
