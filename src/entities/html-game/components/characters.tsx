import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';
import { ForwardedRef, forwardRef } from 'react';
import { HtmlGameModel } from '../model';
import { useStore } from 're-event';
import { Character } from '@entities/html-game/components/character';
import charactersMap from '@assets/characters-map.svg';

interface Props {
  model: HtmlGameModel;
  showTemplate?: boolean;
}

export const CharactersMap = forwardRef(({ model }: Props, ref: ForwardedRef<HTMLObjectElement>) => {
  const isCharactersSetted = useStore(model.isCharactersSetteledStore);

  return (
    <>
      <object
        id="characters-map"
        ref={ref}
        className={classNames(styles.transparentMaps, styles.coinsMap)}
        // --> Костыль, который исправляет баг остановки передвижения после клика по документу.
        // По большому счёту нам больше не нужен object после того, как мы установили все стены в стор.
        style={{ display: isCharactersSetted ? 'none' : 'block' }}
        data={charactersMap}
      />
      <CharactersTemplate model={model} />
    </>
  );
});

function CharactersTemplate({ model }: Props) {
  const charactersRects = useStore(model.charactersDomRectsStore);

  return (
    <>
      {charactersRects.map(character => {
        return <Character key={character.uniqueId} model={model} obstacle={character} />;
      })}
    </>
  );
}
