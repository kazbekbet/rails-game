import styles from '../styles/html-game.module.scss';
import walls from '@assets/walls.svg';
import { Ref, forwardRef, ForwardedRef } from 'react';
import { useStore } from 're-event';
import * as model from '../model';
import classNames from 'classnames';
import { HtmlGameModel } from '../model';

interface Props {
  model: HtmlGameModel;
  showTemplate?: boolean;
}

export const Walls = forwardRef(({ model, showTemplate }: Props, ref: ForwardedRef<HTMLObjectElement>) => {
  const isWallsSetted = useStore(model.isWallsSettedStore);

  return (
    <>
      <object
        id="walls"
        ref={ref}
        className={styles.walls}
        // --> Костыль, который исправляет баг остановки передвижения после клика по документу.
        // По большому счёту нам больше не нужен object после того, как мы установили все стены в стор.
        style={{ display: isWallsSetted ? 'none' : 'block' }}
        data={walls}
      />
      {showTemplate && <WallsTemplate model={model} />}
    </>
  );
});

/** Компонент отображает все реальные стены на карте. */
function WallsTemplate({ model }: { model: HtmlGameModel }) {
  const wallsRects = useStore(model.wallsDomRectsStore);

  return (
    <>
      {wallsRects.map(({ rect, uniqueId }, index) => {
        return (
          <div
            key={uniqueId ?? index}
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              width: rect.width,
              top: rect.top,
              left: rect.left,
              height: rect.height,
            }}
          />
        );
      })}
    </>
  );
}
