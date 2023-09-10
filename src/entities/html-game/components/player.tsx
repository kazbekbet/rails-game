import { useStore } from 're-event-flow';
import { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';
import { HtmlGameModel } from '../model';
import playerInitial from '@assets/player-initial.svg';

export const Player = forwardRef(({ model }: { model: HtmlGameModel }, ref: ForwardedRef<HTMLObjectElement>) => {
  const isPlayerSetted = useStore(model.isPlayerSettedStore);

  return (
    <>
      <object
        id="player-initial-info"
        ref={ref}
        className={classNames(styles.transparentMaps)}
        // --> Костыль, который исправляет баг остановки передвижения после клика по документу.
        // По большому счёту нам больше не нужен object после того, как мы установили все стены в стор.
        style={{ display: isPlayerSetted ? 'none' : 'block' }}
        data={playerInitial}
      />
      <PlayerTemplate model={model} />
    </>
  );
});

function PlayerTemplate({ model }: { model: HtmlGameModel }) {
  const playerStyle = useStore(model.playerStyleStore);
  const moveCssClass = useStore(model.moveCssClassStore);
  const isPlayerMoving = useStore(model.isPlayerMovingStore);

  const className = classNames(styles.player, moveCssClass, {
    [styles.move!]: isPlayerMoving,
  });

  return <div id="player" className={className} style={playerStyle} />;
}
