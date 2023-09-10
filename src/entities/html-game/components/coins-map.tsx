import coinsMap from '@assets/coins-map.svg';
import styles from '@entities/html-game/styles/html-game.module.scss';
import { HtmlGameModel } from '@entities/html-game/model';
import { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import { useStore } from 're-event-flow';
import { Coin } from '@entities/html-game/components/coin';

interface Props {
  model: HtmlGameModel;
}

export const CoinsMap = forwardRef(({ model }: Props, ref: ForwardedRef<HTMLObjectElement>) => {
  const isCoinsSetted = useStore(model.isCoinsSettedStore);

  return (
    <>
      <object
        id="coins-map"
        ref={ref}
        className={classNames(styles.transparentMaps, styles.coinsMap)}
        // --> Костыль, который исправляет баг остановки передвижения после клика по документу.
        // По большому счёту нам больше не нужен object после того, как мы установили все стены в стор.
        style={{ display: isCoinsSetted ? 'none' : 'block' }}
        data={coinsMap}
      />
      <CoinsMapTemplate model={model} />
    </>
  );
});

function CoinsMapTemplate({ model }: Props) {
  const coinsRects = useStore(model.coinsDomRectsStore);

  return (
    <>
      {coinsRects.map(({ rect, uniqueId, collectable }, index) => (
        <Coin
          key={uniqueId ?? index}
          show={collectable?.show}
          width={rect.width}
          top={rect.top}
          left={rect.left}
          height={rect.height}
        />
      ))}
    </>
  );
}
