import { HtmlGame } from '@entities/html-game';
import { ModalWindow } from '@features/show-modal';
import { GameContainer } from '@containers/game-container';

function App() {
  return (
    <>
      <GameContainer />
      <ModalWindow />
    </>
  );
}

export default App;
