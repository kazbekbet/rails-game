import { HtmlGame } from '@entities/html-game';
import { ModalWindow } from '@features/show-modal';
import { GameContainer } from '@containers/game-container';
import { registerSignal } from '@libs/signal';

registerSignal('MarkersId');

function App() {
  return (
    <>
      <GameContainer />
      <ModalWindow />
    </>
  );
}

export default App;
