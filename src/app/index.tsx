import { HtmlGame } from '@entities/html-game';
import { attachModal } from '@features/show-modal';

function App() {
  return (
    <>
      <HtmlGame />
      {attachModal}
    </>
  );
}

export default App;
